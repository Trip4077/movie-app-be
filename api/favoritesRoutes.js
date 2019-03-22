const express = require('express');
const router = express.Router();

const db = require('../data/models/favoritesModel');

//Get User Favorites
router.get('/', (req, res) => {
    db.getFavorites(res);
})

//Get User Favorites
router.get('/:userid', (req, res) => {
    db.getFavoritesByUserId(req.params.userid, res)
})

//Add new Favorite
router.post('/', (req, res) => {
    d
})

module.exports = router;