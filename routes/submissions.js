const express = require('express');
const router = express.Router();
const SubmissionsController = require('../controllers/submissions.controller');

router.post('/new', SubmissionsController.createSubmission);

module.exports = router;
