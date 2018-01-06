class Player extends Phaser.Sprite {
  constructor(game, x, y, key, frame, mixerName, mixerxPos, score) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(.6);
    console.log(score);
    this.score = score;
    this.mixerName = mixerName;
    this.mixerxPos = mixerxPos;
    this.game.physics.arcade.enableBody(this);

    this.addScore();
    this.addMixer();
  }

  addScore() {
    const scoreStyle = {font: `35px Alfa Slab One`, fill: `#9CEFE6`, align: `center`, transform: `skewY(-8deg)`};
    this.label = this.game.add.text(this.mixerxPos, this.game.height - 420, `${this.score}`, scoreStyle);
    this.label.anchor.setTo(0.5);
    console.log(this.label);
  }

  updateScore(bool) {
    if (bool) {
      this.score += 10;
    } else if (!bool) {
      this.score -= 10;
    }
    this.label.setText(this.score);
  }

  addMixer() {
    this.mixer = this.game.add.sprite(this.mixerxPos, this.game.height - 300, this.mixerName);
    this.mixer.anchor.setTo(.5);
    this.mixer.scale.setTo(.5);
  }

  playEnd() {
    console.log(`whoo gewonnen`);
  }

}

module.exports = Player;
