const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const favoritesRoutes = require('./favoritesRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const authRoutes = require('./auth/auth-routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/schedule', scheduleRoutes);

module.exports = router;