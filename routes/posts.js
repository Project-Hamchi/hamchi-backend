const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');

router.post('/', PostsController.getPosts);
router.post('/new', PostsController.createPost);

module.exports = router;
