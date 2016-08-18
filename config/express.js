const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const CronJob = require('cron').CronJob;
const app = express();

app.use(express.static(path.join('__dirname', '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressValidator({
  customValidators: {
    isCronPattern: function(value) {
      try {
        new CronJob(value);
        return true
      } catch (e) {
        return false;
      }
    }
  }
}));

require('./routes')(app);

module.exports = app;
