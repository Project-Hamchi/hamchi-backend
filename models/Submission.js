const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  experience: {
    type: String,
    enum: ['true', 'false'],
    required: true,
  },
  environment: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  details: {
    type: String,
    trim: true,
  },
  matched: {
    type: String,
    enum: ['true', 'false'],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Submission', submissionSchema);
