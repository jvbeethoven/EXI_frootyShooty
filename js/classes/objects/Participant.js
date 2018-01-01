class Participant extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, frame);
    // this.anchor.setTo(0.5, 0.5);
    console.log(frame);
    this.addChild(this.game.add.sprite(0, 0, frame));
    this.game.physics.arcade.enableBody(this);
  }
}

module.exports = Participant;
