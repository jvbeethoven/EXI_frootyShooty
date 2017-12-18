const path = require(`path`);
const Boot = require(`./states/Boot.js`);
const Preload = require(`./states/Preload`);
const Menu = require(`./states/Menu`);
const Play = require(`./states/Play`);
const OscData = require(`./plugins/OscData`);

class Game extends Phaser.Game {
  constructor() {

<<<<<<< HEAD
=======
<<<<<<< HEAD
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, `content`);

    this.state.add(`Boot`, Boot);

=======
>>>>>>> fabc9aa54c5c0b44c03d226fc073a5407e41d684
    //plugin instantiëren in game.js
    // this.plugins.add
    super(500, 800, Phaser.AUTO, `content`);
>>>>>>> Minor changes
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Play`, Play);
    this.plugins.add(`OscData`, OscData);
    this.state.start(`Boot`);
    // console.log(`y`, this.yPosController, `x`, this.xPosController);
  }
}

// const handleResize = () => {
//   console.log(window.innerWidth, window.innerHeight);
// };

module.exports = Game;
