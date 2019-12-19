var express = require('express');
var router = express.Router();

let db = require('../config/db');
const bcrypt = require('bcryptjs');

router.post('/', function (req, res, next) {
    let data = req.body.data
    let id = req.body.id
    let el = data.el || '1'
    let connection = db.connection();
    let sqlString = `update article_dtl set article_class = '${data.class}' ,article_title = '${data.title}' ,article_content = '${data.content}',article_el = '${data.el}',article_status='${data.status}'  WHERE article_id=${data.id}`;
    db.find(connection, sqlString, function (result) {
            res.send({
                status: 1
            });
    });
    db.close(connection);
    return;
});

router.delete('/', function (req, res, next) {
     let id = req.query.id;
    let connection = db.connection();
    let sqlString = 'DELETE FROM article_dtl WHERE article_id =' +  id;
    db.find(connection, sqlString,function (result) {
        if(result.affectedRows == 0){
            res.send({
                status: 0
             }); 
        }else{
            res.send({
                status: 1
             });
        }
    });
    db.close(connection);
    return;
});

module.exports = router;