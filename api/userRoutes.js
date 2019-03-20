const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile'); 

const db = knex(knexConfig.development);

//ADD NEW USER
router.post('/', (req, res) => {
    const user = req.body;

    if(user.fullname && user.password && user.username) {
        db.insert(user)
        .into('users')
        .then(id => {
            res.status(201).json(id[0])
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'User Could Not Be Added'})
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide text for the post." })
    }
})

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

//EDIT USER INFO


module.exports = router;