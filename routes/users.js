var express = require('express');
var router = express.Router();

let db = require('../config/db');
const bcrypt = require('bcryptjs');


//添加账户测试
// router.get('/',function(req, res){
//     let salt = bcrypt.genSaltSync(10);
//     let hash = bcrypt.hashSync('holdon', salt); 
//     let project = {user_id: 2, user_pwd:hash ,user_name:476586908};

//     let sqlString = 'INSERT INTO user SET ?';
//     let connection = db.connection();
//     db.insert(connection, sqlString, project, function(id){
//     });
//     db.close(connection);
//     return;
// });

//登录
router.post('/', function (req, res, next) {
    let user = req.body.user
    let pwd = req.body.pwd
    let sqlString = "select * from user where user_name = " + user;
    let connection = db.connection();
    db.find(connection, sqlString, function (result) {
        if (result.length == 0) {
            res.send({
                status: 2
            });
        } else {
            let oldSold = result[0].user_pwd.substr(0, 29)
            let newPwd = getPwd(pwd, oldSold)
            if (newPwd != result[0].user_pwd) {
                res.send({
                    status: 2
                });
            } else {
                res.cookie("auther","1",{ maxAge: 3600000});
                res.send({
                    status: 1
                });
            }
        }
    });
    db.close(connection);
    return;
});


function getPwd(pwd, salt = bcrypt.genSaltSync(10)) {
    let hash = bcrypt.hashSync(pwd, salt);
    return hash
}


module.exports = router;