const express = require('express');
const router = express.Router();
const ChatsController = require('../controllers/chats.controller');

router.post('/new', ChatsController.createChats);

module.exports = router;
