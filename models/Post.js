const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    enum: ['Syrian', 'Jungle', 'Robo'],
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    enum: ['opened', 'closed'],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  submissions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
  },
});

module.exports = mongoose.model('Post', postSchema);