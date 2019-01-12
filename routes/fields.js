var express = require('express');
var router = express.Router();
const { Field } = require('../sequelize');

/* GET Fields. */
router.get('/', function(req, res, next) {
  Field.findAll().then(field => {
        res.json(field);
  });
});

module.exports = router;
