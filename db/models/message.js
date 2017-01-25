'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Message = db.define('message', {
  content: {
  	type: Sequelize.TEXT,
  	allowNull: false
  },

  messageType: {
  	type: Sequelize.ENUM('Public', 'Private'),
  	allowNull: false
  }
});
  
module.exports = Message;