const createError = require('http-errors');
const s3 = require('../loaders/s3');
const User = require('../models/User');
const Submissions = require('../models/Submission');
const Post = require('../models/Post');


exports.createSubmission = async function (req, res, next) {
  try {
    const {
      userId,
      username,
      photo,
      experience,
      location,
      details,
      postId
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
    const createdAt = Date.now();

    const createdSubmission = await Submissions.create({
      owner: userId,
      ownerName: username,
      environment: imageUrl.Location,
      experience,
      location,
      details,
      createdAt,
      matched: 'false',
    });

    await User.updateOne(
      { _id: userId },
      { $push: { submissions: createdSubmission._id } }
    );

    await Post.updateOne(
      { _id: postId },
      { $push: { submissions: createdSubmission._id } }
    );

    res.json({
      code: 200,
      message: 'create submission success',
      data: {
        submission: createdSubmission
      },
    });
  } catch (err) {
    console.log(err);
    next(createError(500, err));
  }
}
