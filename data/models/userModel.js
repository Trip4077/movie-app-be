const knex = require('knex');
const knexConfig = require('../../knexfile'); 

const db = knex(knexConfig.development);

module.exports = {

    getUsers: res => {
        return db.select('id', 'fullname', 'username', 'age')
                    .from('users')
                    .then(users => {
                        res.status(200).json(users);
                    })
                    .catch(err => {
                        res.status(404).json({ error: err, message: "Could not get Users" })
                    })
    },

    getUser: (id, res) => {
        db.select('id', 'fullname', 'username', 'age')
          .from('users')
          .where({ id })
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
    },

    addUser: (user, res) => {
        console.log(user)
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
    },

    editUser: (changes, id, res) => {
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
    },

    deleteUser: (id, res) => {
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
    }
}