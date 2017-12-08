import Preload from './states/Preload';
import Menu from './states/Menu';
import Play from './states/Play';

class Game extends Phaser.Game {
  constructor() {
    super(canvas.width, canvas.height, Phaser.AUTO, `content`);
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Play`, Play);
    this.state.start(`Preload`);
  }
}

module.exports = Game;
