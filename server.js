const express = require('express');

const helmet = require('helmet');
const logger = require('morgan');

const server = express();

server.use(express.json(), helmet(), logger('dev'));

module.exports = server;