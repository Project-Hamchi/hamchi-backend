const express = require('express');
const router = exporess.Router();
const PostsController = require('../controllers/posts.controller');

router.get('/', PostsController.getPosts);

module.exports = router;
