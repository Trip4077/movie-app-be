const knex = require('knex');
const knexConfig = require('../../knexfile'); 

const db = knex(knexConfig.development);
const Fdb = require('./favoritesModel');

module.exports = {

    //Get All Users from users table
    getUsers: res => {
        return db.select(
                            'fullname as name', 
                            'username as user', 
                            'age', 
                            'Title',
                            'Type',
                            'Year',
                            'Poster',
                            'imdbID'
                        )
                    .from('users')
                    .leftJoin('favorites', 'user_id', 'users.id')
                    .then(users => {
                        res.status(200).json(users);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(404).json({ error: err, message: "Could not get Users" })
                    })
    },

    //Get Logged In User from users table wiht favorites by user_id
    getUser: (id, res) => {
        const favorites = Fdb.getFavoritesById(id, res);
    
        return db.select('id', 'fullname', 'username', 'age')
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

    /*
        Expects:
            { fullname-str,
              username-str,
              password-str,
              number-str,
              age-int }
        to Create User
    */
    addUser: (user, res) => {
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

    //Update User Information based on Changes Passed In
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

    //Delete User Based on User id
    deleteUser: (id, res) => {
        return db('users')
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
    },

    findBy: filter => {
        return db('users').where(filter);
    }
}