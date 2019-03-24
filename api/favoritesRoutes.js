const express = require('express');
const router = express.Router();

const db = require('../data/models/favoritesModel');

//Get All Favorites
router.get('/', (req, res) => {
    db.getFavorites(res);
})

//Get User Favorites
router.get('/:username/:userid', (req, res) => {
    console.log('test')
    db.getFavoritesByUserId(req.params.userid, res);
})

//Get Favorite By ID
router.get('/:id', (req, res) => {
    db.getFavoritesById(req.params.id, res);
})

//Add to Favorite List
router.post('/', (req, res) => {
    db.addFavorite(req.body, res);
})

//Delete Movie from Favorites
router.delete('/:id', (req, res) => {
    db.deleteFavorite(req.params.id, res);
})

module.exports = router;