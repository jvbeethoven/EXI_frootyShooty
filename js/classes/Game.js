const path = require(`path`);
const Boot = require(`./states/Boot.js`);
const Preload = require(path.resolve(`js/classes/states/Preload`));
const Menu = require(path.resolve(`js/classes/states/Menu`));
// const Play = require(path.resolve(`js/classes/states/Play`));

class Game extends Phaser.Game {
  constructor() {

    super(window.innerWidth, window.innerHeight, Phaser.AUTO, `content`);

    this.state.add(`Boot`, Boot);

    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.start(`Boot`);
    // console.log(oscMessage);
  }
}

// const handleResize = () => {
//   console.log(window.innerWidth, window.innerHeight);
// };

module.exports = Game;
