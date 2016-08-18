const express = require('express');
const moment = require('moment');
const router = express.Router();
const expressValidator = require('express-validator');
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

router.get('/', function (req, res) {
  knex.select('*').from('repos').then((rows) => {
    res.json(rows);
  });
});

const validateBody = (req) => {
  req.checkBody('name', '名前を入力してください').notEmpty();
  req.checkBody('cron_pattern', 'cronパターンを入力してください').notEmpty();
  req.checkBody('cron_pattern', 'cronパターンが不正です').isCronPattern();
  req.checkBody('base_branch', 'ベースブランチを入力してください').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    res.status(422);
    res.json(errors);
    res.end();
  }
}

router.post('/', function (req, res) {
  validateBody(req);

  const now = Date.now();
  const repo = {
    name: req.body.name,
    cron_pattern: req.body.cron_pattern,
    base_branch: req.body.base_branch,
    created_at: moment(now).format('YYYY-MM-DD HH:mm:ss'),
    updated_at: moment(now).format('YYYY-MM-DD HH:mm:ss')
  };
  knex('repos').insert(repo).then(() => {
    res.status(201);
    res.json(repo);
  });
});

router.put('/:id', function (req, res) {
  validateBody(req);

  const now = Date.now();
  const repo = {
    name: req.body.name,
    cron_pattern: req.body.cron_pattern,
    base_branch: req.body.base_branch,
    updated_at: moment(now).format('YYYY-MM-DD HH:mm:ss')
  };
  knex.update(repo).from('repos').where({id: req.params.id}).then(() => {
    res.status(204);
    res.end();
  });
});

module.exports = router;
