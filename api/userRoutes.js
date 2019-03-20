const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile'); 

const db = knex(knexConfig.development);

//ADD NEW USER
router.post('/', (req, res) => {
    const user = req.body;

    if(user.fullname && user.password && user.username && user.age) {
        db.insert(user)
        .into('users')
        .then(id => {
            res.status(201).json(id[0])
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'User Could Not Be Added'})
        })
    } else {
        res.status(400).json({ message: "Please provide text for the post." })
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
            res.status(500).json({ error: err, message: "The user information could not be retrieved." });
        })
})

//EDIT USER INFO
router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    if(changes.fullname || changes.username || changes.password || changes.age) {
        db('users')
        .where({ id })
        .update(changes)
        .then(success => {
            if(success) {
                res.status(201).json(changes);
            } else {
              res.status(404).json({ message: "The user with the specified ID does not exist." }) 
            }
        })
        .catch(err => {
          res.status(500).json({ error: err, message: "The user information could not be retrieved." });
        })
    } else {
        res.status(500).json({ message: "Please enter a field to update"})
    }
})

//DELETE USER
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('users')
      .where({ id })
      .del()
      .then(success => {
        if(success) {
            res.status(201).json(success);
        } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." }) 
        }
      })
      .catch(err => {
        res.status(500).json({ error: err, message: "The user could not be deleted." });
      });
})

module.exports = router;