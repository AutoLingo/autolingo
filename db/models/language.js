'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Language = db.define('language', {
  language: {
    type: Sequelize.ENUM('English', 'Chinese', 'French', 'Spanish', 'Korean'),
    allowNull: false
  }
});
  
module.exports = Language;