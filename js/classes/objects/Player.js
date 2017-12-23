export default class Player extends Phaser.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, `player`, `p1_stand.png`);
    // this.jumpSound = this.game.add.audio(`jump`);
    // this.walkSound = this.game.add.audio(`walk`);

    this.nextSoundAt = 0;
    this.soundDelay = 500;
    this.anchor.setTo(0.5);
    this.game.physics.arcade.enableBody(this);
    this.lives = 0;
  }

  set lives(value) {
    this.lives = value;
  }

  get lives() {
    return this.lives;
  }

  walk() {
    if (this.nextSoundAt > this.game.time.now) {
      return;
    }
    this.nextSoundAt = this.game.time.now + this.soundDelay;
    this.walkSound.play();
  }

  tryToJumpUp() {
    this.jumpUp();
    this.jumpSound.play(``, 0, 1, false, false);
  }

  tryToJumpDown() {
    this.jumpDown();
    this.jumpSound.play(``, 0, 1, false, false);
  }

  jumpUp() {
    this.body.velocity.y = - 500;
    this.animations.play(`jump`);
  }

  jumpDown() {
    this.body.velocity.y = 200;
    this.animations.play(`jump`);
  }
}
