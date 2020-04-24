var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);

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
  res.render(err.message);
});

module.exports = app;
