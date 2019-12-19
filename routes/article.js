var express = require('express');
var router = express.Router();

let db = require('../config/db');
const bcrypt = require('bcryptjs');

router.get('/', function (req, res, next) {
    let id = req.query.artId
    let connection = db.connection();
    let sqlString = "select * from article_dtl where article_id = " + id;
    db.find(connection, sqlString, function (result) {
        if (result.length == 0) {
            res.send({
                status: 2,
            });
        } else {
            let articleData = {} 
            result.forEach(element => {
                articleData.id = element.article_id,
                articleData.title = element.article_title,
                articleData.time = element.article_time,
                articleData.content = element.article_content,
                articleData.class = element.article_class,
                articleData.el = element.article_el,
                articleData.status = element.article_status
            });
            res.send({
                status: 1,
                data: articleData
            });
        }
    });
    db.close(connection);
    return;
});


module.exports = router;