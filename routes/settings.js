var express = require('express');
var router = express.Router();
const { Setting } = require('../sequelize');

/* GET users listing. */
router.get('/register/:value', function(req, res, next) {
    let value = req.params.value;
    Setting.findOne({ where: {name: 'register'}, include:[{ all:true }] }).then(
        fetch => {
            if(value != 'check'){
                if(fetch == null){
                    Setting.create({
                        name: 'register',
                        value: value,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                }else{
                    Setting.update({
                        value : value,
                    },{
                        where: {
                            name: 'register'
                        }
                    });
                }
                res.send(200);
            }else{
                if(fetch == null){
                    Setting.create({
                        name: 'register',
                        value: 0,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                    res.json(false);
                }else{
                    res.json(fetch.value);
                } 
            }

            
        });
});
module.exports = router;
