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
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;