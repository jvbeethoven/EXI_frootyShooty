export default class Enemy extends Phaser.Sprite {
  constructor(game, x, y, symbol) {
    super(game, x, y, `enemy`);
    this.symbol = symbol;
  }
}
