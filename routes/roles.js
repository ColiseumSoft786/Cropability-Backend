var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
const { Role, Features, Permission } = require('../sequelize');

/* GET users listing. */
router.get('/list', function (req, res, next) {
    Role.findAll({ include: [{ all: true }] })
        .then(roles => res.json(roles));
});
router.get('/features', function (req, res, next) {
    Features.findAll({ include: [{ all: true }], order: [['name', 'ASC']] })
        .then(feat => res.json(feat));
});
router.get('/get/:id', function (req, res, next) {
    let id = req.params.id;
    Role.findById(id).then(role => {
        Permission.findAll({ where: { roleId: id }, include: [{ all: true }] }).then(perm => {
            res.json({
                role: role,
                perm: perm
            });
        });
    })
});
router.post('/edit/:id', function (req, res, next) {
    let id = req.params.id;
    let rolen = req.body['role'];
    let perm = req.body['perm'];
    console.log(perm);
    Role.update({
        name: rolen.name,
        description: rolen.description
    }, {
            where: { id: id }
        }).then(role => {
            perm.forEach(item => {
                if(item.id == 0){
                    Permission.create({
                        full: item.fullperm,
                        read: item.read,
                        create: item.create,
                        update: item.update,
                        delete: item.delete,
                        roleId: id,
                        featureId: item.feature.id
                    });
                }else{
                    Permission.update({
                        full: item.fullperm,
                        read: item.read,
                        create: item.create,
                        update: item.update,
                        delete: item.delete,
                    }, {
                            where: { id: item.id }
                        });
                }
            });
            res.json({ data: 'done' });
        });
});
router.post('/create', function (req, res, next) {
    let rolen = req.body['role'];
    let perm = req.body['perm'];
    console.log(perm[0].feature.name);
    Role.create({
        name: rolen.name,
        description: rolen.description
    }).then(role => {
        perm.forEach(item => {
            Permission.create({
                full: item.fullperm,
                read: item.read,
                create: item.create,
                update: item.update,
                delete: item.delete,
                roleId: role.get('id'),
                featureId: item.feature.id
            });
        });
        res.json({ data: 'done' });
    });
});
module.exports = router;
