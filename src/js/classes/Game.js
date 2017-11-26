import Play from './states/Play';

export default class Game extends Phaser.Game {
  constructor() {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO);
    this.state.add(`Play`, Play);
    this.state.start(`Play`);
  }
}
