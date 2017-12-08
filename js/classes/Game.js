const path = require("path");
const Preload = require(path.resolve('js/classes/states/Preload'));

// import Preload from './states/Preload';
// import Menu from './states/Menu';
// import Play from './states/Play';

class Game extends Phaser.Game {
  constructor() {

    super(window.innerWidth, window.innerHeight, Phaser.AUTO, `content`);
    this.state.add(`Preload`, Preload);
    // this.state.add(`Menu`, Menu);
    // this.state.add(`Play`, Play);
    this.state.start(`Preload`);

    document.addEventListener('resize', function(e) {
      // body...
    });
  }
}

module.exports = Game;
