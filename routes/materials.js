var express = require('express');
var router = express.Router();
const { Material } = require('../sequelize');
var multer = require('multer');
var fs = require('fs');

/* GET Materials. */
router.get('/', function(req, res, next) {
  Material.findAll().then(mat => {
      res.json(mat);
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
router.post('/create', function(req, res, next) {
    let data = req.body;
    Material.create({
        name: data['name'],
        category: data['category'],
        quantity: data['quantity'],
        unit: data['unit'],
        producer: data['producer'],
        note: data['notes'],
        expiry: new Date(data['expiry']),
        germinationRate: data['germination_rate'],
        image: data['file'],
        type: data['type'],
        price: data['price'],
        qrcode: 'mat-' + Date.now()
    }).then(fetch => {
        res.json(fetch);
    });
});
router.post('/edit/:id', function(req, res, next) {
    let data = req.body;
    Material.update({
        name: data['name'],
        category: data['category'],
        quantity: data['quantity'],
        unit: data['unit'],
        producer: data['producer'],
        note: data['notes'],
        expiry: new Date(data['expiry']),
        germinationRate: data['germination_rate'],
        image: data['file'],
        type: data['type'],
        price: data['price'],
    }, {where: {id: data['id']}}).then(fetch => {
        res.json(fetch);
    });
});
router.get('/getbyid/:id', function(req, res, next) {
    Material.findById(req.params.id).then(mat => {
        res.json(mat);
    });
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