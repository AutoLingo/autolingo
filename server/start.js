'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const passport = require('passport')
const PrettyError = require('pretty-error')
const socketio = require('socket.io');

const chalk = require('chalk');

let IO = null;
  var names = {};

// function getAllRoomMembers(room, namespace, io) {
//         const socketIds = Object.keys(io.nsps[namespace].adapter.rooms[room].sockets);
        
//         const sockets = socketIds.map(id => {
//           const idSplit = id.split('#')[1]
//           return io.sockets.connected[idSplit];
//         })
//           return sockets;
//   }

var userNames = (function() {

  //check if the given name exists in the names object
  var claim = function(name, room) {
    if(!name || names[room] && names[room][name]) {
      return false;
    } else {
    console.log('names', names)
    console.log('room', room)
    console.log('name', name)
    
    names[room][name] = true;
      return true;
    }
  }

  //Set Guest Username to be "Guest 1" and the number will increase depending on whether that guest username already exists
  //The number will only increase if the guest username does not already exist in the names object.
  var getGuestName = function(room) {
   var name,
     nextUserId = 1;

     do {
       name = 'Guest ' + nextUserId;
       nextUserId += 1;
     } while (!claim(name, room));

     return name
 }

  //serialize claimed names as an array
  var get = function(room) {
    var res = [];
    for(let user in names[room]) {
      res.push(user)
    }
    
    return res;
  }

  var free = function (name, room) {
    if (names[room] && names[room][name]) {
      delete names[room][name];
    }
  }

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  }
}())

// Bones has a symlink from node_modules/APP to the root of the app.
// That means that we can require paths relative to the app root by
// saying require('APP/whatever').
//
// This next line requires our root index.js:
const pkg = require('APP')

const app = express()
const http = require('http');
const server = http.createServer()

if (!pkg.isProduction && !pkg.isTesting) {
  // Logging middleware (dev only)
  app.use(require('volleyball'))
}

// Pretty error prints errors all pretty.
const prettyError = new PrettyError();

// Skip events.js and http.js and similar core node files.
prettyError.skipNodeFiles()

// Skip all the trace lines about express' core and sub-modules.
prettyError.skipPackage('express')

module.exports = app
  // We'll store the whole session in a cookie
  .use(require('cookie-session') ({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'an insecure secret key'],
  }))

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Authentication middleware
  .use(passport.initialize())
  .use(passport.session())

  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use(express.static(resolve(__dirname, '..', 'node_modules')))


  // Serve our api
  .use('/api', require('./api'))

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  .use((err, req, res, next) => {

    res.status(500).send(err)
    next()
  })

if (module === require.main) {
  // Start listening only if we're the main module.
  //
  // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
  const server = app.listen(
    process.env.PORT || 1337,
    () => {


    }
  )

  socketInit(server);
}
//**********************socket.io***************************//
//Keep track of names that are being used. So that there is no duplicates


//**********
function socketInit (server) {
  if (!IO) IO = socketio(server);
  else return IO

  var groupChat = IO.of('/group-chat')
  var videoChat = IO.of('/video-chat')

//**********GROUP CHAT ************
  groupChat.on('connection', function(socket) {

    socket.on('join_room', function(data) {
      console.log('data', data)
      if (!names[data.room]) {
        names[data.room] = {};
      }

      let name = userNames.getGuestName(data.room);
      socket.name = name;
      socket.currentRoom = data.room
      socket.join(data.room)

      groupChat.to(data.room).emit('init', {
          name: name,
          users: userNames.get(data.room)
        });
      // const roomMembers = getAllRoomMembers(data.room, '/group-chat', IO)
      socket.to(data.room).broadcast.emit('user:join', {
        name: name
      });
    })

    socket.on('send:message', function(data) {
      groupChat.to(data.room).emit('send:message', {
        user: socket.name,
        text: data.text,
        language: data.language,
        id: data.id
      })
    })

    //validate user's new name and show success message
    socket.on('change:name', function(data, fn) {
      console.log(socket.currentRoom)
      if(userNames.claim(data.name, socket.currentRoom)) {

        var oldName = socket.name;
        userNames.free(oldName, socket.currentRoom);

        let newName = data.name;
        socket.name = newName;

        socket.broadcast.to(socket.currentRoom).emit('change:name', {
          oldName,
          newName
        });

        fn(true)
      } else {
        fn(false)
      }
    });

    socket.on('room_exit', function() {
      console.log(`${socket.name} is disconnecting`)
      groupChat.to(socket.currentRoom).emit('user:left', {
        name: socket.name
      })
      userNames.free(socket.name, socket.currentRoom);
        console.log('USERS LEFT IN ROOM: ', names);
      })
    
    socket.on('disconnect', function(){
        console.log(`${socket.name} is disconnecting`)
      groupChat.to(socket.currentRoom).emit('user:left', {
        name: socket.name
      })
      userNames.free(socket.name, socket.currentRoom);
        console.log('USERS LEFT IN ROOM: ', names);
    })

  })
// *********VIDEO CHAT********************
  videoChat.on('connection', function(socket) {

    socket.on('join_room', function(data) {
      let room = data.room
      socket.join(room)
    })

    socket.on('broadcast_video_room', function(data) {
      socket.broadcast.emit('broadcast_video_room', {
        room: data.room
      })
    })

    socket.on('interim_transcript', function(data) {
      let room = data.room

      socket.broadcast.emit('interim_transcript', {
       interimTranscript: data.interimTranscript,
       userLanguage: data.userLanguage
      })
    })

    socket.on('final_transcript', function(data) {
      socket.broadcast.emit('final_transcript', {
       finalTranscript: data.finalTranscript,
       userLanguage: data.userLanguage
      })
    })

  })
}
