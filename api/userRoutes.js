const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile'); 

const db = knex(knexConfig.development);

//GET USER by ID
router.get('/:id', (req, res) => {
    db('users')
        .where({ id: req.params.id })
        .then(user => {
            if(user.length > 0) {
                res.status(200).json(user[0])
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." });
        })
})

module.exports = router;