const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');

router.get('/:userId', PostsController.myPosts);
router.post('/new', PostsController.createPost);
router.post('/', PostsController.getPosts);

module.exports = router;
