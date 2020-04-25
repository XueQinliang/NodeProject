var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
router.get('/',function(req,res,next) {
    res.render("revise",{title:'修改密码'});
});

router.post('/show', bodyParser.urlencoded({extended: false}), (req, res, next) => {
  var response = {
    "password":req.body.password,
    "password2":req.body.password2
  };
  var _res = res;
  console.log(req.body);
  var resdata = {};
  pool.getConnection(function (err, connection){
    connection.query(userSQL.revise, [response['password'],global.username], function (err, res){
      if(res){
        resdata.success=1;
        resdata.msg='修改成功';
        console.log(resdata);
        _res.end(JSON.stringify(resdata));
      }else{
          _res.end(JSON.stringify({success:0,msg:err.message}));
      }
    });
  });
});
module.exports = router;
