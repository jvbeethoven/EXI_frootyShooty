const path = require(`path`);
const Preload = require(path.resolve(`js/classes/states/Preload`));
const Menu = require(path.resolve(`js/classes/states/Menu`));
// const Play = require(path.resolve(`js/classes/states/Play`));

class Game extends Phaser.Game {
  constructor() {

    super(window.innerWidth, window.innerHeight, Phaser.AUTO, `content`);
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    // this.state.add(`Play`, Play);
    this.state.start(`Preload`);
    // console.log(oscMessage);
  }

  update() {
    // console.log(`test`);
  }
}

// const handleResize = () => {
//   console.log(window.innerWidth, window.innerHeight);
// };

module.exports = Game;
