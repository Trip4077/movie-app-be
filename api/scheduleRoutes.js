const express = require('express');
const router = express.Router();

const db = require('../data/models/scheduleModel');

router.post('/', (req, res) => {
    db.scheduleMovie(req.body, res);
});

router.delete('/:id', (req, res) => {
    db.deleteScheduled(req.params.id, res)
})

module.exports = router;