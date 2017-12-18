const path = require("path");
const Preload = require(path.resolve('js/classes/states/Preload'));
const Menu = require(path.resolve('js/classes/states/Menu'));

// import Play from './states/Play';

class Game extends Phaser.Game {
  constructor() {

    //plugin instantiëren in game.js
    // this.plugins.add
    super(500, 800, Phaser.AUTO, `content`);
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    // this.state.add(`Play`, Play);
    this.state.start(`Preload`);
  }
}

module.exports = Game;
