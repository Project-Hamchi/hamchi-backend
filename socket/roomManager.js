const Message = require('../models/Message');
const chatRooms = {};

const createChatRoom = async (roomId) => {
  const chats = await Message.findById(roomId);

  return chatRooms[roomId] = chats;
};

const getChatRoom = (roomId) => {
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

module.exports = {
  createChatRoom,
  getChatRoom,
  addMessage
};
