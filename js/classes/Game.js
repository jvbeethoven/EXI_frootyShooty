const path = require(`path`);
const Boot = require(`./states/Boot.js`);
const Preload = require(`./states/Preload`);
const Menu = require(`./states/Menu`);
const Play = require(`./states/Play`);
<<<<<<< HEAD
=======
const OscData = require(`./plugins/OscData`);
>>>>>>> 1219fd7bfe2e1a74f7931978fd3508c5798329a4

class Game extends Phaser.Game {
  constructor() {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, `content`);

    this.state.add(`Boot`, Boot);

    //plugin instantiëren in game.js
    // this.plugins.add
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Play`, Play);
<<<<<<< HEAD
=======
    this.plugins.add(`OscData`, OscData);
>>>>>>> 1219fd7bfe2e1a74f7931978fd3508c5798329a4
    this.state.start(`Boot`);
    // console.log(`y`, this.yPosController, `x`, this.xPosController);
  }
}

// const handleResize = () => {
//   console.log(window.innerWidth, window.innerHeight);
// };

module.exports = Game;
