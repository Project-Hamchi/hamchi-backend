const createError = require('http-errors');
const Post = require('../models/Post');

exports.getPosts = async function (req, res, next) {
  const { page = 1, limit = 20 } = req.body;

  try {
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments();

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.createPost = async function (req, res, next) {
  const {
    image,
    name,
    age,
    location,
    type,
    number,
    details
  } = req.body;
}
