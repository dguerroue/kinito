// STYLES
//
import '../scss/index.scss'


// socket.emit(_EVENT_NAME_, _PAYLOAD_);

// socket.on(_EVENT_NAME_, () => {
//   //callback
// })

// MODULES
//
class Dices{
  constructor(numDices){
    this.numDices = numDices;
    this.values = new Array();
    this.socket = io('http://830df3d28c29.ngrok.io')

    this.shuffle();
  }

  shuffle(){
    for (let i = 0; i < this.numDices; i++) {
      this.values[i] = Math.floor(Math.random() * 6 + 1);
    }
  }
}

//###############################
//          FUNCTIONS
//###############################

function drawDices(dices) {
  //DEBUG : console.log(dices);

  let dicesWrapper = document.getElementById('dices');
  //Clear
  dicesWrapper.innerHTML = "";

  for (let i = 0; i < dices.numDices; i++) {
    let dice = document.createElement("div");
    dice.setAttribute("class", "dice dice-" + dices.values[i]);
    let dotWrapper = document.createElement("div");
    dotWrapper.setAttribute("class","dot-wrapper");
    let dotToShow = new Array();
    

    //Creates dots = value
    let diceValue = dices.values[i];
    if (diceValue === 1) dotToShow = [3];
    else if (diceValue === 2) dotToShow = [1,5];
    else if (diceValue === 3) dotToShow = [1,3,5];
    else if (diceValue === 4) dotToShow = [1,2,4,5];
    else if (diceValue === 5) dotToShow = [1,2,3,4,5];
    else if (diceValue === 6) dotToShow = [1,2,4,5,61,62];
    else console.error("error: dice value must be in 1 - 6");

    for (let index = 0; index < diceValue; index++) {
      let diceDot = document.createElement("span");
      diceDot.setAttribute("class", "dot dot" + dotToShow[index])
      dotWrapper.appendChild(diceDot);
    }

    //Append dice
    dice.appendChild(dotWrapper);
    dicesWrapper.appendChild(dice)
  }
};

//######## END FUNCTIONS ########




var btnShuffle = document.querySelector('button.action-shuffle');

// drawDices();
btnShuffle.onclick = function(e){
  e.preventDefault();
  
  // //disable button
  // this.disabled = true;
  // this.classList.add("disabled");
  
  var loop = 0;
  function looping(){
    setTimeout(function () {
      var dices = new Dices(2);
      drawDices(dices);
      
      loop++;
      if(loop < 8) looping();
    }, 120);
  }
  looping();

}