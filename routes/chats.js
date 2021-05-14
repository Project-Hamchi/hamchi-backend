const express = require('express');
const router = express.Router();
const ChatsController = require('../controllers/chats.controller');

router.post('/new', ChatsController.createChats);
router.get('/:userId', ChatsController.myChats);

module.exports = router;
