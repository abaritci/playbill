const express = require('express'),
  router = express.Router(),
  auth = require('../middlewares/auth.middleware'),
  jobService = require('../services/job.service');

router.get('/', auth, jobService.getJobs);

router.delete('/:id', auth, jobService.deleteJobs);

router.get('/:id', auth, jobService.getJob);

router.put('/:id', auth, jobService.editJob);


module.exports = router;
