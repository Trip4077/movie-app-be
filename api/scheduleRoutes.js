require('dotenv').config();

const express = require('express');
const router = express.Router();

const Nexmo = require('nexmo');
const db = require('../data/models/scheduleModel');
console.log(process.env.enter)
const nexmoConfig = new Nexmo({
    apiKey: process.env.enter,
    apiSecret: process.env.shh
}, { debuh: true })

router.post('/', (req, res) => {
    db.scheduleMovie(req.body, res);
});

router.get('/:username/:id', (req, res) => {
    db.getUserSchedule(req.params.id, res);
})

router.put('/:id', (req, res) => {
    db.editSchedule(req.body, req.params.id, res);
})

router.delete('/:id', (req, res) => {
    db.deleteScheduled(req.params.id, res)
})

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
