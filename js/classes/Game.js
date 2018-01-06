const Boot = require(`./states/Boot`);
const Preload = require(`./states/Preload`);
const Menu = require(`./states/Menu`);
const Play = require(`./states/Play`);
const Video = require(`./states/Video`);
const PlayEnd = require(`./states/PlayEnd`);
// const OscData = require(`./plugins/OscData`);

class Game extends Phaser.Game {
  constructor() {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, `content`);

    this.scaleMode = Phaser.ScaleManager.RESIZE;
    this.state.add(`Boot`, Boot);
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Play`, Play);
    this.state.add(`Video`, Video);
    this.state.add(`PlayEnd`, PlayEnd);
    this.state.start(`Boot`);
  }
}

// const handleResize = () => {
//   console.log(window.innerWidth, window.innerHeight);
// };

module.exports = Game;
