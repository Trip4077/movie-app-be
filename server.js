const express = require('express');
const routes = require('./api/routes');

const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors')

const server = express();

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const SMS = require('./smsfile');

server.use(express.json(), helmet(), cors(), logger('dev'));
server.use('/api', routes);

let intervalID;

//Run Schedule Check for Sending SMS Notifications every 5s
const compareCycle = () => {
    intervalID = setInterval(() => {
        db.select('*')
            .from('schedules')
            .then(schedules => {
                    schedules.map(schedule => {
                    //SMS.compareDateTime(schedule);
                });
            })
            .catch(err => {
                console.log(err)
            })
    }, 5000); 
}

compareCycle()

module.exports = server;