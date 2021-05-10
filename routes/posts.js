const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');

router.get('/', PostsController.getPosts);
router.post('/new', PostsController.createPost);

module.exports = router;
