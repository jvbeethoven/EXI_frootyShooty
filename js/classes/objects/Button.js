class Button extends Phaser.Sprite {
  constructor(game, x, y, key, frame, number) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(.5);
    this.variable = number;
    this.enableBody = true;
    this.game.physics.arcade.enableBody(this);
    this.game.add.tween(this).to({y: this.game.height - 260 + ((this.variable + 1) * 10)}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
  }
}

module.exports = Button;
