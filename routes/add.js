var express = require('express');
var router = express.Router();

let db = require('../config/db');
const bcrypt = require('bcryptjs');

router.post('/', function (req, res, next) {
    let data = req.body.data;
    let connection = db.connection();
    let time = Date.now()
    let el = data.el || '1'
    let sqlString = `INSERT INTO article_dtl (article_title,article_owner,article_class,article_time,article_content,article_status,article_el) VALUES ('${data.title}',1,'${data.class}','${time}','${data.content}','${data.status}','${el}')`
    db.find(connection, sqlString,function (result) {
        res.send({
            status: 1
        });
    });
    db.close(connection);
    return;
});

module.exports = router;
