class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, `player-1`);
    this.anchor.setTo(0.5);
    this.game.physics.arcade.enableBody(this);
  }

}

module.exports = Player;
