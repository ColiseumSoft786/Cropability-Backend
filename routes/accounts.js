var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
const { User, Role, Permission, Field } = require('../sequelize');
var jwt = require('jsonwebtoken');
var app = express();
var config = require('../config');
/* LOGIN. */
router.post('/login', function(req, res, next) {
    var username = req.body['username'];
    var password = req.body['password'];
    // res.json(username);
    User.findOne({ where: {username: username}, include:[{ all:true }] }).then(
        fetch => {
            if(fetch != null){
                if(passwordHash.verify(password, fetch.password)){
                    req.session.user = fetch;
                    const payload = {
                        check:  true
                      };
                      var token = jwt.sign(payload, config.secret, {
                            expiresIn: 5440 // expires in 24 hours
                      });
                      Permission.findAll({ where: {roleId: fetch.roleId}, include:[{ all:true }]}).then(perm => {
                        Field.findAll().then(field => {
                            res.json({
                                message: 'authentication done',
                                token: token,
                                user: fetch,
                                perm: perm,
                                field: field
                              });
                        });
                      });
                }else{
                    res.json(null);
                }
            }else{
                res.json(null); 
            }
        });
});

// Register
router.post('/auth/register', function(req, res) {
    var data = req.body;
    User.create({
        username: data['username'],
        email: data['email'],
        phone: data['phone'],
        enabled: true,
        password: passwordHash.generate(data['password']),
        fullname: data['fullname'],
        position: data['position'],
        joining_date: new Date(data['joining_date']),
        salary: data['salary'],
        cnic: data['cnic'],
        createdAt: new Date(),
        updatedAt: new Date()
      }).then(fetch => {
          res.json(fetch)
      });
});

// Find By Username
router.get('/username/:username', function(req, res) {
    var user = req.params.username;
    User.findOne({ where: {username: user}, include:[{ all:true }]}).then(fetch => {
        if(fetch != null){
            res.json(fetch);
        }else{
            res.send('notFound');
        }
    })
});
// Find By Email
router.get('/email/:email', function(req, res) {
    var email = req.params.email;
    User.findOne({ where: {email: email}, include:[{ all:true }] }).then(fetch => {
        if(fetch != null){
            res.json(fetch);
        }else{
            res.send('notFound');
        }
    })
});
// Find By Id
router.get('/user/:id', function(req, res) {
    var id = req.params.id;
    User.findById(id,{ include:[{ all:true }]} ).then(fetch => {
        if(fetch != null){
            res.send(fetch);
        }else{
            res.send('notFound');
        }
    });
});
// Logout
router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if(err) {
          console.log(err);
          res.send('problem');
        } else {
          res.send(200);
        }
      }); 
});
router.get('/getRoles/:id', function(req, res) {
    Permission.findAll({ where: {roleId: req.params.id}, include:[{ all:true }]}).then(perm => {
        res.json(perm);
      });
});
module.exports = router;
