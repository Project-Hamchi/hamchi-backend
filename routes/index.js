const express = require('express');

const user = require('./user');
const posts = require('./posts');

const router = express.Router();

router.use('/user', user);
router.use('/posts', posts);

module.exports = router;
