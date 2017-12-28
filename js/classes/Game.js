const Boot = require(`./states/Boot.js`);
const Preload = require(`./states/Preload`);
const Menu = require(`./states/Menu`);
const Play = require(`./states/Play`);
// const OscData = require(`./plugins/OscData`);

class Game extends Phaser.Game {
  constructor() {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, `content`);

    this.scaleMode = Phaser.ScaleManager.RESIZE;
    this.state.add(`Boot`, Boot);

    //plugin instantiëren in game.js
    // this.plugins.add
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Play`, Play);
    // this.plugins.add(`OscData`, OscData);
    this.state.start(`Boot`);
  }
}

// const handleResize = () => {
//   console.log(window.innerWidth, window.innerHeight);
// };

module.exports = Game;
