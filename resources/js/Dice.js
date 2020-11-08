export default class Dices {
  constructor(params) {
    this.validate(params)

    this.wrapper = params.wrapper

    this.value = null
  }
  
  validate(params) {
    // wrapper required
    if(!params.wrapper) {
      throw(new Error('Dice: wrapper is undefined'))
    } else if(!document.querySelector(params.wrapper)) {
      throw(new Error('Dice: wrapper \''+ params.wrapper +'\' is undefined'))
    }
  }

  /**
   * @desc set a random value
   * @return {Number} value
   */
  shuffle () {
    this.value = Math.floor(Math.random() * 6 + 1)
  }

  /**
   * @desc draw dice in wrapper
   */
  drawDice () {
    let diceWrapper = document.querySelector(this.wrapper);
    let diceValue = this.value;
    //Clear
    diceWrapper.innerHTML = "";

    // dice div
    let dice = document.createElement("div")
    dice.classList.add('dice-' + this.value)

    // dots wrapper div
    let dotWrapper = document.createElement("div")
    dotWrapper.classList.add('dots-wrapper')

    // generates dots
    let dotToShow = new Array();

    if (diceValue === 1) dotToShow = [3];
    else if (diceValue === 2) dotToShow = [1,5];
    else if (diceValue === 3) dotToShow = [1,3,5];
    else if (diceValue === 4) dotToShow = [1,2,4,5];
    else if (diceValue === 5) dotToShow = [1,2,3,4,5];
    else if (diceValue === 6) dotToShow = [1,2,4,5,61,62];
    else throw(new Error('dice value must be between 1 and 6'));

    for (let index = 0; index < diceValue; index++) {
      let diceDot = document.createElement("span");
      diceDot.classList.add('dot', 'dot' + dotToShow[index])
      dotWrapper.appendChild(diceDot);
    }

    // append dots
    dice.appendChild(dotWrapper)

    //Append dice
    diceWrapper.appendChild(dice)
  }

  /**
   * @desc Shuffle and drawDice multiple value ( roll a dice )
   */
  roll () {
    let looping = 0;

    const loop = () => {
      setTimeout( () => {

        this.shuffle()
        this.drawDice()
        
        looping++;
        if(looping < 8) loop();
      }, 120);
    }

    loop();
  }
}