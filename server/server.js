const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(8080, { origins: 'http://localhost:8000'});

const helpers = require('./helpers')

let rooms = {}

io.on('connection', (socket) => {
  const socket_id = socket.id
  let room_id;

  socket.on('JOIN_ROOM', (payload) => {
    if(!rooms[payload.roomCode])
      io.to(socket_id).emit('ROOM_NOT_CREATED', {})

    room_id = payload.roomCode

    Object.values(rooms[room_id]).map((element) => {
      io.to(element.id).emit('UPDATE_ROOM', {
        users: Object.values(rooms[room_id])
      })
    })

    rooms[room_id][socket.id] = {
      id: socket.id,
      name: payload.username,
      player: false,
    }

    io.to(socket_id).emit('JOINED_ROOM', {
      roomCode: room_id,
      viewName: 'pending',
      users: Object.values(rooms[room_id]),
      html: helpers.getHtml(__dirname + '/../resources/views/pending.html', [
        {
          index: "__PLAYER__",
          value: helpers.getPlayer(rooms[room_id]).name
        },
      ])})

  })

  socket.on('CREATE_ROOM', (payload) => {
    room_id = helpers.randomString(8);

    if(!rooms[room_id]) {
      rooms[room_id] = {}
    }

    rooms[room_id][socket.id] = {
      id: socket.id,
      name: payload.username,
      player: true,
    }

    io.to(socket_id).emit('ROOM_CREATED', {
      roomCode: room_id,
      viewName: 'game',
      users: Object.values(rooms[room_id]),
      html: helpers.getHtml(__dirname + '/../resources/views/game.html', [
        {
          index: "__ROOM_CODE__",
          value: payload.username
        },
      ])})
  })

  socket.on('disconnect', () => {
    if(room_id) {
      delete rooms[room_id][socket_id]

      Object.values(rooms[room_id]).map((element) => {
        io.to(element.id).emit('UPDATE_ROOM', {
          users: Object.values(rooms[room_id]),
        })
      })

      let user_list = Object.values(rooms[room_id])
      user_list = user_list.filter((element) => element != null)

      if(!user_list.length)
        delete rooms[room_id]
    }
  });

});