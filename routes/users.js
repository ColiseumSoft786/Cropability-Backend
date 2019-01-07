var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
const { User, Role, Documents } = require('../sequelize');
var passwordHash = require('password-hash');
var multer = require('multer');
var fs = require('fs');


/* GET users listing. */
router.get('/list/:id', function(req, res, next) {
    let id = req.params.id;
    const Op = Sequelize.Op;
    User.findAll({ where: {
      id: {
        [Op.ne]: id
      }}, include:[{ all:true }]}).then(users => res.json(users));
});
router.post('/insert', function(req, res) {
  res.json(req.header('id'));
});
router.get('/user/:id', function(req, res) {
   User.findById(req.params.id).then(user => res.json(user));
});
router.post('/profile/:id', function(req, res) {
  upload(req,res,function(err){
    if(err){
         res.json({error_code:1,err_desc:err});
         return;
    }
    let id = req.params.id;
    let filename = req.file.filename;
    User.update({
      photo: filename
    },{
      where: {id: id}
    }).then(fetch => {
      User.findById(req.params.id).then(user => res.json(user));
    });
  });
});

router.get('/status/:status/:id', function(req, res) {
  var status = req.params.status;
  var id = req.params.id;
  User.update({
    enabled : status
  },{
    where: { id: id }
  });
  res.json({data: 'true'});
});

// Register
router.post('/create', function(req, res) {
  var data = req.body;
  console.log(data);
  Role.findById(data['role']).then(role => {
    User.create({
      username: data['username'],
      email: data['email'],
      phone: data['phone'],
      enabled: true,
      password: passwordHash.generate(data['password']),
      fullname: data['fullname'],
      position: data['position'],
      joining_date: new Date(data['joining']),
      salary: data['salary'],
      cnic: data['cnic'],
      createdAt: new Date(),
      updatedAt: new Date(),
      roleId: data['role'],
      enabled: data['enabled'],
      photo: 'assets/avatar.png'
    }).then(fetch => {
        res.json(fetch)
    });
  });
  
});
router.post('/edit/:id', function(req, res) {
  var data = req.body;
  var id = req.params.id;
  console.log(data);
  Role.findById(data['role']).then(role => {
    User.update({
      username: data['username'],
      email: data['email'],
      phone: data['phone'],
      enabled: true,
      fullname: data['fullname'],
      position: data['position'],
      joining_date: new Date(data['joining']),
      salary: data['salary'],
      cnic: data['cnic'],
      createdAt: new Date(),
      updatedAt: new Date(),
      roleId: data['role'],
      enabled: data['enabled']
    },{
      where: {id: id}
    }).then(fetch => {
        res.json(fetch)
    });
  });
  
});
router.post('/update/:id', function(req, res) {
  var data = req.body;
  var id = req.params.id;
    User.update({
      username: data['username'],
      email: data['email'],
      phone: data['phone'],
      enabled: true,
      fullname: data['fullname'],
      position: data['position'],
      joining_date: new Date(data['joining']),
      salary: data['salary'],
      cnic: data['cnic'],
      createdAt: new Date(),
      updatedAt: new Date(),
      enabled: data['enabled']
    },{
      where: {id: id}
    }).then(fetch => {
      User.findById(id).then(user => res.json(user));
    });
  
});
router.post('/changepassword/:id', function(req, res) {
  var data = req.body;
  var id = req.params.id;
    User.update({
      password: passwordHash.generate(data['password']),
    },{
      where: {id: id}
    }).then(fetch => {
      User.findById(id).then(user => res.json(user));
    });
});

router.get('/documents/:id', function(req, res) {
  var id = req.params.id;
  Documents.findAll({ where: {userId: id}}).then(doc => {
    res.json(doc);
  });
});
router.post('/document/set/image', function(req, res) {
  upload(req,res,function(err){
    if(err){
         res.json({error_code:1,err_desc:err});
         return;
    }
    res.json(req.file.filename);
  });
});
router.post('/document/:id', function(req, res) {
    let body = req.body;
    Documents.create({
      name: body['name'],
      expiry: new Date(body['expiry']),
      photo: body['photo'],
      userId: req.params.id
    }).then(doc => {
      Documents.findAll({
        where: {userId: req.params.id}
      }).then(docs => {
        res.json(docs);
      });
    });
});
router.get('/document/delete/:id/:userId', function(req, res) {
  Documents.findById(req.params.id).then(doc => {
    fs.exists('./uploads/' + doc['photo'], function(exists) {
      if(exists) {
        console.log('File exists. Deleting now ...');
        fs.unlink('./uploads/' + doc['photo']);
          Documents.destroy({
            where: {id: req.params.id}
          }).then(doc => {
            Documents.findAll({
              where: {userId: req.params.userId}
            }).then(docs => {
              res.json(docs);
            });
          });
      } else {
        console.log('File not found, so not deleting.');
      }
    });

  })

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