'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

var speech = require('google-speech-api');

var opts = {
  filetype: 'mp4',
  file: '/audio2.mp4',
  key: 'AIzaSyD14sPZI-llghUkC3_PgO11-fpQV_yrjac'
};

speech(opts, function (err, results) {
  console.log('**************', results);
  // [{result: [{alternative: [{transcript: '...'}]}]}]
});

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
