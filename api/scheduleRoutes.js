require('dotenv').config();

const express = require('express');
const router = express.Router();

const Nexmo = require('nexmo');
const db = require('../data/models/scheduleModel');

//Configuration for Nexmo SMS service
const nexmoConfig = new Nexmo({
    apiKey: process.env.enter,
    apiSecret: process.env.shh
}, { debuh: true })

//Add movie to schedule
router.post('/', (req, res) => {
    db.scheduleMovie(req.body, res);
});

//Get all scheduled movies
router.get('/', (req, res) => {
    db.getFullSchedule(res);
})

//Get curremt user schedule
router.get('/:username/:id', (req, res) => {
    db.getUserSchedule(req.params.id, res);
})

//Edit scheduled movie by ID
router.put('/:id', (req, res) => {
    db.editSchedule(req.body, req.params.id, res);
})

//Delete scheduled movie
router.delete('/:id', (req, res) => {
    db.deleteScheduled(req.params.id, res)
})

//Expects { number-str, tex-str } to send SMS to user phone
router.post('/send', (req, res) => {
    const { number, text } = req.body;

    nexmoConfig.message.sendSms(
        '12153150647', number, text, { type: 'unicode' },
        (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.dir(res)
            }
        }
    )
})

module.exports = router;
