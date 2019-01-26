var express = require('express');
var router = express.Router();
const { Area, Zone } = require('../sequelize');
var multer = require('multer');

router.get('/:area', function(req, res, next) {
  Zone.findAll({
    where: {areaId: req.params.area}, include: [{ all: true }]
  }).then(zone => {
      res.json(zone)
  });
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
  Zone.create({
    name: data['name'],
    isGrowing: data['isGrowing'],
    area_total: data['area_total'],
    image: data['image'],
    growingMethod: data['growingMedium'],
    boards: data['boards'],
    holes: data['holes'],
    isActive: true,
    unit: data['unit'],
    fieldId: req.params.field,
    userId: req.params.uid,
    reservoirId: data['reservoirId'],
    areaId: data['areaId'],
    qrcode: 'area-' + Date.now()
}).then(fetch => {
  Zone.findAll({
    where: {areaId: data['areaId']}, include: [{ all: true }]
  }).then(area => {
      res.json(area)
  });});
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