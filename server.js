const express = require('express');
const routes = require('./api/routes');

const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors')

const server = express();

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const moment = require('moment');
const Nexmo = require('nexmo');

server.use(express.json(), helmet(), cors(), logger('dev'));
server.use('/api', routes);

const nexmoConfig = new Nexmo({
    apiKey: process.env.enter,
    apiSecret: process.env.shh
}, { debuh: true })

let intervalID;

const compareCycle = () => {
    intervalID = setInterval(() => {
        db.select('*')
            .from('schedules')
            .then(schedules => {
                console.log(schedules);
                schedules.map(schedule => {
                    compareDateTime(schedule);
                })
            })
            .catch(err => {
                console.log(err)
            })

        //console.log(scheduleList)
    }, 5000); 
}

const compareDateTime = schedule => {
    if(schedule.date === (new Date().toDateString())
        && schedule.compareTime === moment().format('HH:mm')) {
            
        console.log(schedule);
        sendSms(schedule);
    } else {
        console.log(false);
    }
}

const sendSms = movie => {
    const textInfo = {
        text: `${movie.title} is scheduled at ${movie.readTime} on ${movie.date}`,
        number: '12764691994'
    }
    console.log(textInfo);
    nexmoConfig.message.sendSms(
        '12153150647', textInfo.number, textInfo.text, { type: 'unicode' },
        (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.dir(res)
            }
        }
    )
}

compareCycle()

module.exports = server;