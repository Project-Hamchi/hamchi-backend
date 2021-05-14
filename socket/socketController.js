const io = require('socket.io')();
const {
  isChatRoomExists,
  createChatRoom,
  getChatRoom,
  addMessage
} = require('./roomManager');

io.on('connection', (socket) => {
  socket.on('join', async (roomId) => {
    socket.join(roomId);

    if (!isChatRoomExists(roomId)) {
      const chatRoom = await createChatRoom(roomId);

      socket.emit('sendChatRoom', chatRoom);
    } else {
      const chatRoom = getChatRoom(roomId);

      socket.emit('sendChatRoom', chatRoom);
    }
  });

  socket.on('sendMessage', async (args) => {
    const { message, userId, username } = args;

    addMessage(args);
    io.to(args.roomId).emit('sendMessage', {
      user: {
        id: userId,
        name: username
      },
      message,
      time: new Date()
    });
  });
});

module.exports = io;
