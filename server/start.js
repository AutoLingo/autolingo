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


var userNames = (function() {

  //check if the given name exists in the names object
  var claim = function(name, room, socketId) {
    if(!name || names[room] && names[room][name]) {
      return false;
    } else {
    names[room][name] = socketId;
    return true;
    }
  }

  //Set Guest Username to be "Guest 1" and the number will increase depending on whether that guest username already exists
  //The number will only increase if the guest username does not already exist in the names object.
  var getGuestName = function(room, socketId) {
   var name,
     nextUserId = 1;

     do {
       name = 'Guest ' + nextUserId;
       nextUserId += 1;
     } while (!claim(name, room, socketId));

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

  var getNameObjects = function(room) {
    var res = [];
    for(let user in names[room]) {
      res.push({
        [user]: names[room][user]
      })
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
    getNameObjects: getNameObjects,
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
      console.log('data: ', data);
      let room = data.room
      let id = socket.id

      if (!names[room]) {
        names[room] = {};
      }
      console.log('data.userName: ', data.userName);

      let name = data.userName && userNames.claim(data.userName, room, id) ? data.userName : userNames.getGuestName(room, id);
      console.log('name: ', name);
        
      socket.name = name;
      socket.room = room
      socket.join(room)

      groupChat.to(room).emit('init', {
          name: name,
          users: userNames.get(room)
        });
      // const roomMembers = getAllRoomMembers(room, '/group-chat', IO)
      socket.to(room).broadcast.emit('user:join', {
        name: name
      });
        console.log('name: TO BE EMITTED', name);
    })

    socket.on('send:message', function(data) {
      socket.broadcast.to(socket.room).emit('send:message', {
        user: socket.name,
        text: data.text,
        language: data.language,
        id: data.id
      })
    })

    //validate user's new name and show success message
    socket.on('change:name', function(data, fn) {
      if(userNames.claim(data.name, socket.room, socket.id)) {

        var oldName = socket.name;
        userNames.free(oldName, socket.room);

        let newName = data.name;
        socket.name = newName;

        socket.broadcast.to(socket.room).emit('change:name', {
          oldName,
          newName
        });

        fn(true)
      } else {
        fn(false)
      }
    });

    socket.on('room_exit', function() {
      socket.leave(socket.room)

      groupChat.to(socket.room).emit('user:left', {
        name: socket.name
      })

      userNames.free(socket.name, socket.room);
    });
    
    socket.on('disconnect', function(){
      groupChat.to(socket.room).emit('user:left', {
        name: socket.name
      })

      userNames.free(socket.name, socket.room);
    });

  })
// *********VIDEO CHAT********************
  videoChat.on('connection', function(socket) {

    socket.on('join_room', function(data) {
      let room = data.room
      socket.join(room)
      socket.room = room
    })

    socket.on('send_video_invitation', function(data) {
      const userObjects = userNames.getNameObjects(data.room)
      const userObject = userObjects.filter((userObject) => {
        return userObject[data.name]
      })[0]
console.log('INVITATION DATA', data)
      const userSocketId = userObject[data.name]

      groupChat.to(userSocketId).emit('video_invitation', {
        link: data.link,
        user: data.user
      })
    })

    socket.on('interim_transcript', function(data) {
      videoChat.to(socket.room).emit('interim_transcript', {
       interimTranscript: data.interimTranscript,
       userLanguage: data.userLanguage
      })
    })

    socket.on('final_transcript', function(data) {
      videoChat.to(socket.room).emit('final_transcript', {
       finalTranscript: data.finalTranscript,
       userLanguage: data.userLanguage
      })
    })

  })
}
