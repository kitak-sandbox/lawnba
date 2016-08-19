const express = require('express');
const router = express.Router();

const jobs = {};

router.get('/:id', function (req, res) {
  const jobId = req.params.id;

  res.json({
    status: jobs[jobId]
  });
});

router.post('/', function (req, res) {
  const repoId = req.body.repoId;

  const jobId = Date.now() + '';
  jobs[jobId] = 'pending';

  res.status(202);
  res.json({
    jobId: jobId
  });

  // TODO: exec command
  setTimeout(() => {
    jobs[jobId] = 'success';
  }, 5000);
});

module.exports = router;
