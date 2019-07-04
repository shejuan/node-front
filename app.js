var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var router = require('./routes/router.js');
var shouye = require('./routes/shouye.js');
var solution = require('./routes/solution.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 把用户访问导入路由模块
app.use('/',router);     // 把所有的访问都导入到该模块中
app.use('/',shouye);
app.use('/',solution)


// 图片路径
app.use('/assets',express.static(path.join(__dirname,'assets')))
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// 生成404 not found 错误，并且将这个错误交给出错处理函数
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 处理错误，兵器将出错信息显示在页面上
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 向外暴露express实例
module.exports = app;
