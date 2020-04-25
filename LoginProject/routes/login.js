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
router.get('/',function(req,res,next) {
  res.render("login",{title:'欢迎登录'});
});
router.post('/show', function(req, res, next){
  console.log(req.body);
  var response = {
    "username":req.body.username,
    "password":req.body.password
  };
  var postres = res;
  resdata = {}
  pool.getConnection(function (err, connection){
    connection.query(userSQL.check, [response['username'],response['password']], function (err, res){
      console.log(res.length);
      if(res && res.length>0){
        global.username = response['username'];
        req.session.user = response['username'];
        if (req.session.originalUrl) {  // 如果存在原始请求路径，将用户重定向到原始请求路径
          var redirectUrl = req.session.originalUrl;
          req.session.originalUrl = null;  // 清空 session 中存储的原始请求路径
        } else {  // 不存在原始请求路径，将用户重定向到根路径
          var redirectUrl = '/';
        }
        resdata.redirectUrl = redirectUrl;
        resdata.result = 1;
        postres.end(JSON.stringify(resdata));
      }else{
        resdata.result = 0;
        postres.end(JSON.stringify(resdata));
      }
    });
  });
  /*if (req.session.originalUrl) {  // 如果存在原始请求路径，将用户重定向到原始请求路径
    var redirectUrl = req.session.originalUrl;
    req.session.originalUrl = null;  // 清空 session 中存储的原始请求路径
  } else {  // 不存在原始请求路径，将用户重定向到根路径
    var redirectUrl = '/';
  }*/
});

module.exports = router;
