'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const passport = require('passport')
const PrettyError = require('pretty-error')
const socket = require('socket.io');
const chalk = require('chalk');



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
    console.log(prettyError.render(err))
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
      console.log(`--- Started HTTP Server for ${pkg.name} ---`)      
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}
//**********************socket.io***************************//
//Keep track of names that are being used. So that there is no duplicates
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
    for(user in names) {
      res.push(user)
    }

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

//**********
module.exports = function(socket) {
  var name = userNames.getGuestName();

  socket.on('connection', function(socket) {
    console.log('A new user has connected')

    //send the new user their name and a list of users
    socket.emit('init', {
      name: name,
      users: userNames.get()
    });

    //notify other users that a new user has joined
    socket.broadcast.emit('user:join', {
      name: name
    });

    //render/send user's message to other user
    socket.on('send:message', function(data) {
      socket.broadcast.emit('send:message', {
        user: name,
        text: data.text
      })
    })
    
    //validate user's new name and show success message
    socket.on('change:name', function(data, fn) {
      if(userNames.claim(data.name)) {
        var oldName = name;
        userNames.free(oldName);

        name = data.name;

        socket.broadcast.emit('change:name', {
          oldName: oldName,
          newName: name
        });

        fn(true)
      } else {
        fn(false)
      }
    });

    //send/broadcast to user2 that user1 left the chat box
    socket.on('disconnect', function() {
      socket.broadcast.emit('user:left', {
        name: name
      })
      userNames.free(name);
    })
  })
}






