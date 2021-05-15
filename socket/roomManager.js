const Message = require('../models/Message');
const chatRooms = {};
const users = {};

const isChatRoomExists = (roomId) => {
  return chatRooms[roomId];
}

const createChatRoom = async (roomId) => {
  const chats = await Message.findById(roomId);

  users[roomId] = 1;
  return chatRooms[roomId] = chats;
};

const getChatRoom = (roomId) => {
  users[roomId]++;

  return chatRooms[roomId];
}

const addMessage = (args) => {
  const { roomId, message, userId, username } = args;

  chatRooms[roomId].messages.push({
    user: {
      id: userId,
      name: username
    },
    message,
    time: new Date()
  });
};

const saveChat = async (roomId) => {
  const chatRoom = chatRooms[roomId];

  users[roomId]--;
  await Message.findOneAndUpdate(
    { _id: roomId },
    { $set: { messages: chatRoom.messages } }
  );

  if (!users[roomId]) {
    delete chatRooms[roomId];
  }
};

module.exports = {
  isChatRoomExists,
  createChatRoom,
  getChatRoom,
  addMessage,
  saveChat
};
