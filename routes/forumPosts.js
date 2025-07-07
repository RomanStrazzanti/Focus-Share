// routes/forumPosts.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { getAllPosts, createPost } = require('../controllers/forumPostController');

// ⚠️ routes protégées
router.get('/', authenticate, getAllPosts);
router.post('/', authenticate, createPost); // author_id sera injecté depuis req.user.id

module.exports = router;
