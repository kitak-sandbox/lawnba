const express = require('express');
const router = express.Router();
const child_process = require('child_process');
const tmp = require('tmp');

const promisify = require('../libs/promisify');

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

  // Create tmp dir
  const dir = promisify(tmp.dir);
  const exec = promisify(child_process.exec);

  const buffer = {
    name: 'kitak-sandbox/lawnba'
  };
  dir().then(([path, cleanupCallback]) => {
    buffer.path = path;
    buffer.cleanupCallback = cleanupCallback;

    // Clone repo
    const {name} = buffer;
    return exec(`git clone git@github.com:${name}.git`,{
      cwd: path,
      encoding: 'utf8'
    });
  }).then(([stdout, stderr]) => {
    // Checkout baseBranch
    const {path, name} = buffer;
    const baseBranch = 'master';
    return exec(`git checkout ${baseBranch}`, {
      cwd: `${path}/${name.split('/')[1]}`,
      encoding: 'utf8'
    });
  }).then(([stdout, stderr]) => {
    // Exec npm-ci-update with env
    const {path, name} = buffer;
    return exec(`ci-npm-update`, {
      cwd: `${path}/${name.split('/')[1]}`,
      encoding: 'utf8',
      env: {
        PATH: '/Users/kitak/.nodebrew/current/bin:/usr/local/bin:/usr/bin:/bin'
      }
    });
  }).then(([stdout, stderr]) => {
    if (stdout.length > 0) {
      console.log(stdout);
    }
    if (stderr.length > 0) {
      console.error(stderr);
    }
    jobs[jobId] = 'success';
  }).catch((e) => {
    console.error(e.message);
    jobs[jobId] = 'error';
  }).then(() => {
    // Cleanup
    const {cleanupCallback} = buffer;
    if (cleanupCallback) {
      cleanupCallback();
    }
  });
});

module.exports = router;
