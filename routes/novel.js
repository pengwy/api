var express = require('express');
var router = express.Router();

let db = require('../config/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  let connection = db.connection();
  let sqlString = "select * from book";
  db.find(connection, sqlString, function (result) {
    if (result.length == 0) {
      res.send({
        status: 2,
      });
    } else {
      let articleArr = []
      result.forEach(element => {
        let article = {}
        article.name = element.name
        article.id = element.id
        articleArr.push(article)
      });
      res.send({
        status: 1,
        data: articleArr
      });
    }
  });
  db.close(connection);
  return;
});


router.get('/list', function (req, res, next) {
  let connection = db.connection();
  let id = req.query.id
  let sqlString = `select * from book_des where parent_id = ${id} ORDER BY id DESC`;
  db.find(connection, sqlString, function (result) {
    if (result.length == 0) {
      res.send({
        status: 2,
      });
    } else {
      let articleArr = []
      result.forEach(element => {
        let article = {}
        article.name = element.title
        article.id = element.id
        article.parentId = element.parent_id
        articleArr.push(article)
      });
      res.send({
        status: 1,
        data: articleArr
      });
    }
  });
  db.close(connection);
  return;
});

router.get('/des', function (req, res, next) {
  let connection = db.connection();
  let id = req.query.id
  let sqlString = `select * from book_des where id = ${id}`;
  db.find(connection, sqlString, function (result) {
    if (result.length == 0) {
      res.send({
        status: 2,
      });
    } else {
      let article = {}
      result.forEach(element => {
        article.title = element.title
        article.id = element.id
        article.content = element.des
        article.parentId =   element.parent_id
      });
      res.send({
        status: 1,
        data: article
      });
    }
  });
  db.close(connection);
  return;
});




module.exports = router;