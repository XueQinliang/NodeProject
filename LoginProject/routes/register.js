var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
router.get('/',function(req,res,next) {
    res.render("register",{title:'欢迎注册'});
});

router.post('/show', bodyParser.urlencoded({extended: false}), (req, res, next) => {
  var response = {
    "username":req.body.username,
    "password":req.body.password,
    "password2":req.body.password2
  };
  var _res = res;
  console.log(req.body);
  var resdata = {};
  pool.getConnection(function (err, connection){
    connection.query(userSQL.getUser, [response['username']], function (err, res){
      if(res && res.length>0){
        console.log("当前用户已经存在");
        resdata.exist=1;
        resdata.success=0;
        resdata.msg='当前用户已经存在';
        console.log(resdata);
        //responseJSON(_res, data);
        _res.end(JSON.stringify(resdata));
      }else{
        connection.query(userSQL.insert, [response['username'],response['password']], function (err, result){
          if(result){
            console.log("当前用户注册成功");
            resdata.exist=0;
            resdata.success=1;
            resdata.msg='当前用户注册成功';
            console.log(resdata);
            //responseJSON(_res, data);
            _res.end(JSON.stringify(resdata));
          }
        });
      }
    });
  });
});
module.exports = router;
