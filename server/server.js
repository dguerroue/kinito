const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const helpers = require('./helpers')

let rooms = {}

io.on('connection', (socket) => {
  console.log("user connected");

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

http.listen(8080);