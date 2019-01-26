var express = require('express');
var router = express.Router();
const { Area, Zone } = require('../sequelize');
var multer = require('multer');

router.get('/:field', function(req, res, next) {
  Area.findAll({
    where: {fieldId: req.params.field}, include: [{ all: true }]
  }).then(area => {
      res.json(area)
  });
});
router.get('/zone/:aid', function(req, res, next) {
  Zone.findAll({
    where: {areaId: req.params.aid}, include: [{ all: true }]
  }).then(zones => {
      res.json(zones);
  });
});

router.get('/byid/:id', function(req, res, next) {
  Area.findById(req.params.id, {include: [{ all: true }]}).then(ar => {
    res.json(ar);
  })
});
router.post('/create/image', function(req, res, next) {
  upload(req,res,function(err){
    if(err){
         res.json({error_code:1,err_desc:err});
         return;
    }
    let filename = req.file.filename;
    res.json(filename);
  });
});
router.post('/:field/create/:uid', function(req, res, next) {
  let data = req.body;
  Area.create({
    name: data['name'],
    isGrowing: data['isGrowing'],
    area: data['area'],
    image: data['image'],
    unit: data['unit'],
    fieldId: req.params.field,
    userId: req.params.uid,
    qrcode: 'area-' + Date.now()
}).then(fetch => {
    res.json(fetch);
});
});
router.post('/update/:id', function(req, res, next) {
  let data = req.body;
  if(data['image'] == ''){
    Area.update({
      name: data['name'],
      isGrowing: data['isGrowing'],
      area: data['area'],
      unit: data['unit'],
    },{where: { id: data['id']}}).then(fetch => {
      res.json(fetch);
  });
  }else {
    Area.update({
      name: data['name'],
      isGrowing: data['isGrowing'],
      area: data['area'],
      unit: data['unit'],
      image: data['image'],
    },{where: { id: data['id']}}).then(fetch => {
      res.json(fetch);
  });
  }
 
});

module.exports = router;

// multar
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
var upload = multer({ //multer settings
              storage: storage
          }).single('file');