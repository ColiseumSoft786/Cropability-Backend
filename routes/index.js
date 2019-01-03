var express = require('express');
var router = express.Router();
const { User } = require('../sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello World');
});

module.exports = router;
