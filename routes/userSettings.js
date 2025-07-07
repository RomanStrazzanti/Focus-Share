// routes/userSettings.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { getSettings, updateSettings } = require('../controllers/userSettingsController');

// Toutes les routes sont protégées
router.get('/', authenticate, getSettings); // settings du user connecté
router.put('/', authenticate, updateSettings);

module.exports = router;
