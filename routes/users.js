var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
const { User, Role } = require('../sequelize');
var passwordHash = require('password-hash');

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
      enabled: data['enabled']
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


module.exports = router;
