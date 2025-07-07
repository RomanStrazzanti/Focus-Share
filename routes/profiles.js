// routes/profiles.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { getProfiles, getProfileById } = require('../controllers/profileController');

// Lecture publique autorisée (si RLS autorise `SELECT USING (true)`), sinon protège
router.get('/', getProfiles);
router.get('/me', authenticate, getProfileById); // Pas besoin d’ID explicite, on utilise req.user.id

module.exports = router;
