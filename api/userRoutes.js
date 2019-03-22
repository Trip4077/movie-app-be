const express = require('express');
const router = express.Router();

const db = require('../data/models/userModel');

//ADD NEW USER
router.post('/', (req, res) => {
    db.addUser(req.body, res);
});

//GET ALL USERS
router.get('/', (req, res) => {
    db.getUsers(res)
})

//GET USER by ID
router.get('/:id', (req, res) => {
    db.getUser(req.params.id, res);
})

//EDIT USER INFO
router.put('/:id', (req, res) => {
    db.editUser(req.body, req.params.id, res)
})

//DELETE USER
router.delete('/:id', (req, res) => {
    db.deleteUser(req.params.id, res);
})

module.exports = router;