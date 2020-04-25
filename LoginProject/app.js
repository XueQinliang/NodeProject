var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var reviseRouter = require('./routes/revise');
var app = express();
/*const mysql = require('mysql');
var connection = mysql.createConnection({
    // 主机名称，一般是本机
    host: '202.112.113.26',
    // 数据库的端口号，如果不设置，默认是3306
    port: '3306',
    // 创建数据库时设置用户名
    user: 'test',
    // 创建数据库时设置的密码
    password: '123456',
    // 创建的数据库
    database: 'loginproject'
});
connection.connect();*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cookieParser('xxx'));
app.use(session({
    secret: 'xxx',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24   //有效期一天
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  if (req.session.user) {
      //用户登录过
      console.log("用户登录过了");
      next();
  }else{
    var arr = req.url.split('/');
    if(arr.length>1){
      if(arr[1]=='login' || arr[1]=='register'){
        next();
      }else{
        req.session.originalUrl = req.originalUrl ? req.originalUrl : null;
        res.redirect('/login');
        res.end();
      };
    };
  };
});
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout',logoutRouter);
app.use('/revise',reviseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  console.log(err.message);
  res.render('error',{color:"orangered", errcode:err.status, errmsg:err.message});
});

module.exports = app;
