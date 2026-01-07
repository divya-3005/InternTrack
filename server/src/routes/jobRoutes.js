const express = require('express');
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getJobs).post(protect, createJob);
router.route('/:id').put(protect, updateJob).delete(protect, deleteJob);

module.exports = router;
