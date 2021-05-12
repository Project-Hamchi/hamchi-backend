const createError = require('http-errors');
const s3 = require('../loaders/s3');
const User = require('../models/User');
const Post = require('../models/Post');

exports.getPosts = async function (req, res, next) {
  try {
    const { page = 1, limit = 6 } = req.body;
    const { type } = req.query;
    let posts;

    if (!type) {
      posts = await Post.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    } else if (Array.isArray(type)) {
      posts = await Post.aggregate([
        { $match: { type: { $in: type } } },
        { $skip: (page - 1) * limit },
        { $limit: limit * 1 }
      ]);
    } else {
      posts = await Post.aggregate([
        { $match: { type: type } },
        { $skip: (page - 1) * limit },
        { $limit: limit * 1 }
      ]);
    }

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


exports.myPosts = async function (req, res, next) {
  try {
    const { userId } = req.params;

    const user = await User
      .findById(userId)
      .populate('posts');

    res.json({
      code: 200,
      message: 'my posts fetch success',
      data: { posts: user.posts },
    });
  } catch (err) {
    next(createError(500, err));
  }
}

exports.createPost = async function (req, res, next) {
  try {
    const {
      userId,
      username,
      photo,
      name,
      age,
      gender,
      location,
      type,
      number,
      details
    } = req.body;

    const buffer = Buffer.from(photo.base64, "base64");
    const params = {
      Bucket: 'hamchi-images',
      Key: Date.now() + new Date().toISOString(),
      Body: buffer,
      ACL: 'public-read',
      ContentEncoding: "base64",
      ContentType: "image/jpg",
    };
    const imageUrl = await s3.upload(params).promise();
    const createdPost = await Post.create({
      owner: userId,
      ownerName: username,
      image: imageUrl.Location,
      name,
      age,
      gender,
      location,
      type,
      number,
      details,
      status: 'opened'
    });

    await User.updateOne(
      { _id: userId },
      { $push: { posts: createdPost._id } }
    );

    res.json({
      code: 200,
      message: 'create post success',
      data: {
        post: createdPost
      },
    });
  } catch (err) {
    console.log(err);
    next(createError(500, err));
  }
}
