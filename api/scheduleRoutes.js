const express = require('express');
const router = express.Router();

const db = require('../data/models/scheduleModel');

router.post('/', (req, res) => {
    db.scheduleMovie(req.body, res);
});

router.get('/:username/:id', (req, res) => {
    db.getUserSchedule(req.params.id, res);
})

router.delete('/:id', (req, res) => {
    db.deleteScheduled(req.params.id, res)
})

module.exports = router;