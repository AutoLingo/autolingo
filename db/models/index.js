'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Language = require('./language');
const Message = require('./message');
const Topic = require('./Topic');

//Table Associations
Language.belongsToMany(Message, {through: 'message_language'});
Message.belongsToMany(Language, {through: 'message_language'});

Message.belongsTo(User);
User.hasMany(Message);

Topic.hasMany(Message);
Message.belongsTo(Topic);

module.exports = {
	User,
	Language,
	Message,
	Topic
}
