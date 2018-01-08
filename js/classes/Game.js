const Boot = require(`./states/Boot`);
const Preload = require(`./states/Preload`);
const Menu = require(`./states/Menu`);
const Intro = require(`./states/Intro`);
const Play = require(`./states/Play`);
const Video = require(`./states/Video`);

class Game extends Phaser.Game {
  constructor() {
    super(1920, 1080, Phaser.AUTO, `content`);

    this.scaleMode = Phaser.ScaleManager.RESIZE;
    this.state.add(`Boot`, Boot);
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Intro`, Intro);
    this.state.add(`Play`, Play);
    this.state.add(`Video`, Video);
    this.state.start(`Boot`);
  }
}

module.exports = Game;
