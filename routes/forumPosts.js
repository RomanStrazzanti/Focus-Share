const express = require('express');
const router = express.Router();
const { getAllPosts, createPost } = require('../controllers/forumPostController');

router.get('/', getAllPosts);
router.post('/', createPost); // Le body doit contenir author_id et content

module.exports = router;