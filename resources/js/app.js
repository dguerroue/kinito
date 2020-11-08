// STYLES
//
import '../scss/index.scss'

// const socket = io('http://828f54346b24.ngrok.io')
const socket = io('http://localhost:8080')

import Dice from './Dice'

/**
 * @desc Toggle targeted items if input not empty
 * @param {String} selector
 */
function toggleOnInput(input, selector) {
  
  let elemsToToggle = document.querySelectorAll(selector)
  if(elemsToToggle.length == 0) {
    throw(new Error('No elems to toggle'))
  }

  for(let i = 0; i < elemsToToggle.length; i++) {
    let elemToToggle = elemsToToggle[i]

    if(input.value !== '') {
      elemToToggle.removeAttribute('disabled')
    } else {
      elemToToggle.setAttribute('disabled', true)
    }
  }

}
window.toggleOnInput = toggleOnInput

// join room
function joinRoom() {
  let username = document.getElementById('username').value
  let roomCode = document.getElementById('roomcode').value

  socket.emit('JOIN_ROOM', {
    username: username,
    roomCode: roomCode
  });
}
window.joinRoom = joinRoom


// create room
function createRoom() {
  let username = document.getElementById('username').value

  console.log(username)

  socket.emit('CREATE_ROOM', {
    username: username
  });

  socket.on('ROOM_CREATED', (data) => {
    //callback
    console.log(data)

    document.getElementById('content').innerHTML = data.html
    document.body.setAttribute('data-view', data.viewName)

    // creation des dés
    const dice_1 = new Dice({
      wrapper: '.dice_1'
    })
    const dice_2 = new Dice({
      wrapper: '.dice_2'
    })

    dice_1.roll()
    dice_2.roll()

    document.querySelector('#actions .action-shuffle').addEventListener('click', () => {
      dice_1.roll()
      dice_2.roll()
    })
  })
}
window.createRoom = createRoom