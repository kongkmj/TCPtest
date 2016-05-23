var net = require('net');

var socket = net.connect({port : 4444});
socket.on('connect',function () {
  console.log('connected to server!');

  setInterval(function () {
    socket.write('minahjoo');
  },1000);
});


//서버로 부터 받은 데이터를 화면에 출력
socket.on('data',function (chunk) {
  console.log('recieve: '+chunk);
});

//접속 종료시 출력
socket.on('end',function () {
  console.log('disconnected');
});

// 에러처리
socket.on('error',function (err) {
  console.log(err);
});

//connection 에서 timeout 이 발생시 출력
socket.on('timeout',function () {
  console.log('connection timeout.');
});
