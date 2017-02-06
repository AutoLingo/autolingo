'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const passport = require('passport')
const PrettyError = require('pretty-error')
const socketio = require('socket.io');

const chalk = require('chalk');

let IO = null;

function getAllRoomMembers(room, namespace, io) {
        const socketIds = Object.keys(io.nsps[namespace].adapter.rooms[room].sockets);
        console.log('socketIds: ', socketIds);
        const sockets = socketIds.map(id => {
          const idSplit = id.split('#')[1]
          return io.sockets.connected[idSplit];
        })
          return sockets;
        
        
  }

var userNames = (function() {
  var names = {};

  //check if the given name exists in the names object
  var claim = function(name) {
    if(!name || names[name]) {
      return false;
    } else {
    names[name] = true;
      return true;
    }
  }

  //Set Guest Username to be "Guest 1" and the number will increase depending on whether that guest username already exists
  //The number will only increase if the guest username does not already exist in the names object.
  var getGuestName = function() {
   var name,
     nextUserId = 1;

     do {
       name = 'Guest ' + nextUserId;
       nextUserId += 1;
     } while (!claim(name));

     return name
 }

  //serialize claimed names as an array
  var get = function() {
    var res = [];
    for(let user in names) {
      res.push(user)
    }
    console.log('user names on server: ', res);
    return res;
  }

  var free = function (name) {
    if (names[name]) {
      delete names[name];
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
    var name = userNames.getGuestName();
    socket.name = name

    socket.on('join_room', function(data) {
      socket.currentRoom = data.room
      console.log('data on join)_room: ', data);
      
        socket.join(data.room)
        console.log('data.room: ', data.room);
        
        
        groupChat.to(data.room).emit('init', {
          name: name,
          users: userNames.get()
        });
       
        const roomMembers = getAllRoomMembers(data.room, '/group-chat', IO)

    
      
      socket.to(data.room).broadcast.emit('user:join', {
        name: name
      });
    })

     

    //notify other users that a new user has joined

    //render/send user's message to other user
    socket.on('send:message', function(data) {
      socket.broadcast.emit('send:message', {
        user: name,
        text: data.text,
        language: data.language,
        id: data.id
      })
    })

    //validate user's new name and show success message
    socket.on('change:name', function(data, fn) {
      if(userNames.claim(data.name)) {
        var oldName = name;
        userNames.free(oldName);

        name = data.name;

        groupChat.to(socket.currentRoom).emit('change:name', {
          oldName: oldName,
          newName: name
        });

        fn(true)
      } else {
        fn(false)
      }
    });

    //send/broadcast to user2 that user1 left the chat box
   
      
    socket.on('disconnect', function(){
      groupChat.to(socket.currentRoom).emit('user:left', {
        name: socket.name
      })
      userNames.free(socket.name);
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
