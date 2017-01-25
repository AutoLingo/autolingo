'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Topic = db.define('topic', {
  type: {
  	type: Sequelize.ENUM('Travel', 'Culture', 'Politics'),
  	allowNull: false
  }
});
  
module.exports = Topic;