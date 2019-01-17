var express = require('express');
var router = express.Router();
const { Reservoir } = require('../sequelize');

/* GET Reservoir. */
router.get('/:id', function(req, res, next) {
  Reservoir.findAll({where: {fieldId: req.params.id}, include: [{ all: true }]}).then(rese => {
      res.json(rese);
  })
});
/* Create Reservoir. */
router.post('/create/:id', function(req, res, next) {
    Reservoir.create({
        name: req.body['name'],
        capacity: req.body['capacity'],
        unit: req.body['unit'],
        fieldId: req.params.id,
    }).then(fetch => {
        Reservoir.findAll({where: {fieldId: req.params.id}, include: [{ all: true }]}).then(rese => {
            res.json(rese);
        })
    })
  });
  router.post('/update/:id', function(req, res, next) {
    Reservoir.update({
        name: req.body['name'],
        capacity: req.body['capacity'],
        unit: req.body['unit']
    },{
        where: {id: req.body['id']}
    }).then(fetch => {
        Reservoir.findAll({where: {fieldId: req.params.id}, include: [{ all: true }]}).then(rese => {
            res.json(rese);
        })
    })
  });
   
module.exports = router;
