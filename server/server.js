const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(8080, { origins: 'http://localhost:8000'});

const helpers = require('./helpers')

let rooms = {}

io.on('connection', (socket) => {
  console.log("user connected");
  const socket_id = socket.id
  let room_id;

  socket.on('join room', (payload) => {

  })

  socket.on('CREATE_ROOM', (payload) => {
    room_id = helpers.randomString(8);

    if(!rooms[room_id]) {
      rooms[room_id] = {}
    }

    rooms[room_id][socket.id] = payload.username

    io.to(socket_id).emit('ROOM_CREATED', {
      roomCode: room_id,
      viewName: 'game',
      html: helpers.getHtml(__dirname + '/../resources/views/game.html', [
        {
          index: "__ROOM_CODE__",
          value: payload.username
        },
      ])})
  })

  socket.on('disconnect', () => {
    console.log("user disconnected");
    if(room_id) {
      delete rooms[room_id][socket_id]

      let user_list = Object.values(rooms[room_id])
      user_list = user_list.filter((element) => element != null)

      if(!user_list.length)
        delete rooms[room_id]
    }
  });

});