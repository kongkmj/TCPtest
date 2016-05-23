var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// TCP
var net = require('net');

var server = net.createServer(function (socket) {
  console.log(socket.address().address+"connected");

  //client로 부터 오는 data 출력
  socket.on('data',function (data) {
    console.log('recieve: '+data);
  });

  //client와 접속이 끊겻을때
  socket.on('close',function () {
    console.log('client disconnected');
  });
  //client 가 접속 했을때
  socket.write('welcome to TCP server');

});

// 에러처리
server.on('error',function (err) {
  console.log('err'+err);
});

//port 4444로 연결 대기
server.listen(4444,function () {
  console.log('TCP listening on 5000');
});


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
