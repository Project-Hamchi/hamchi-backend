const createError = require('http-errors');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const User = require('../models/User');

exports.signin = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email }).lean();

    if (!currentUser) {
      return next(createError(400, 'user not exist'));
    }

    const isCorrectPassword = argon2.verify(currentUser.password, password);
    if (!isCorrectPassword) {
      return next(createError(403, 'wrong password'));
    }

    const appIdToken = jwt.sign(currentUser._id, secretKey);

    return res.json({ currentUser, appIdToken });
  } catch (err) {
    next(createError(500, err));
  }
}
