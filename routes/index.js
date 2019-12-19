var express = require('express');
var router = express.Router();

let db = require('../config/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  let artClass = req.query.class
  let status = req.query.artStatus || ''
  let connection = db.connection();
  let sqlString =  `select * from article_dtl where article_class = ${artClass} AND article_status=1`;
  if(status){
      sqlString = `select * from article_dtl where article_class = ${artClass}`;
  }
  db.find(connection, sqlString, function (result) {
    if (result.length == 0) {
      res.send({
        status: 2,
      });
    } else {
      let articleArr = []
      result.forEach(element => {
        articleArr.push({
          title:element.article_title,
          id:element.article_id,
          class:element.article_class,
          status:element.article_status,
        })
      });
      let isMe = "auther" in req.cookies
      res.send({
        status: 1,
        auther:isMe,
        data: articleArr
      });
    }
  });
  db.close(connection);
  return;
});








module.exports = router;