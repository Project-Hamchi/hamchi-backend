const express = require('express');
const router = exporess.Router();
const PostsController = require('../controllers/posts.controller');

router.get('/', PostsController.getPosts);
router.get('/new', PostsController.createPost);

module.exports = router;
