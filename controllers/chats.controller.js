const createError = require('http-errors');
const User = require('../models/User');
const Chat = require('../models/Chat');

exports.createChats = async function (req, res, next) {
  try {
    const { ownerId, guestId, message } = req.body;

    const owner = await User.findById(ownerId);
    const guest = await User.findById(guestId);

    const chat = await Chat.create({
      owner: {
        id: ownerId,
        name: owner.username
      },
      guest: {
        id: guestId,
        name: guest.username
      },
      messages: [
        {
          user: {
            id: ownerId,
            name: owner.username
          },
          message: message,
          time: new Date
        }
      ]
    });

    await User.updateMany(
      { _id: { $in: [ownerId, guestId] } },
      { $push: { chats: chat._id } },
      { multi: true }
    );

    res.json({
      code: 200,
      message: 'create chat success',
    });
  } catch (err) {
    next(createError(500, err));
  }
};
