var should = require('should');
var io = require('socket.io-client');
var socketURL = 'http://localhost:1337/'

var options = {
	transports: ['websocket'],
	'force new connection': true
};

var user1 = {'userName': 'Lee'}
var user2 = {'userName': 'Martin'}

describe('Chat Server', function() {
	it('should broadcast new user to all users', function(done) {
		var client1 = io.connect(socket, options);

		client1.on('connect', function(data) {
			client1.emit('user:join', user1.userName);
		});

		var client2 = io.connect(socket, options);

		client2.on('connect', function(data) {
			client2.emit('user:join', user2.userName)
		});

		clinet2.on('new user', function(usersName) {
			usersName.should.equal('user:join', user2.userName);
			client2.disconnect();
		});
	});

	it('should broadcast to all users when a user leaves', function() {
		var client1 = io.connect(socket, options);
		client1 = io.disconnect(socket, options);

		client1.on('disconnect', function(data) {
			client1.emit('user:left', user1.userName)
		})

		var client2 = io.connect(socket, options);
		client2 = io.disconnect(socket, options);

		client2.on('disconnect', function(data) {
			client2.emit('user:left', user2.userName)
		})
	})
})