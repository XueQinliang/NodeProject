var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user',{'username':global.username,'dscrpt':global.dscrpt});
});

router.post('/descript',function(req, res, next){
  var response = req.body;
  pool.getConnection(function (err, connection){
    connection.query(userSQL.insert_description, [response['inputbox'],global.username], function (err, result){
      if(result){
        global.dscrpt=response['inputbox'];
        resdata.success=1;
        resdata.msg='保存成功';
        console.log(resdata);
      }
      res.redirect('/user');
    });
  });
});
module.exports = router;
