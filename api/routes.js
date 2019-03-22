const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const favoritesRoutes = require('./favoritesRoutes');

router.use('/users', userRoutes);
router.use('/favorites', favoritesRoutes);

module.exports = router;