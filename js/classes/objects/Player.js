class Player extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(.6);
    this.score = 0;
    this.game.physics.arcade.enableBody(this);
  }

}

module.exports = Player;
