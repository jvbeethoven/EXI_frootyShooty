class Player extends Phaser.Sprite {
  constructor(game, x, y, key, frame, mixerName, mixerBottomName, mixerxPos, mixerBottomxPos, score, variable) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5);
    this.scale.setTo(.6);
    this.score = score;
    this.variable = variable;
    this.mixerName = mixerName;
    this.mixerBottomxPos = mixerBottomxPos;
    this.mixerBottomName = mixerBottomName;
    this.mixerxPos = mixerxPos;
    this.game.physics.arcade.enableBody(this);

    this.addScore();
    this.addMixer();
    this.addMixerBottom();
  }

  addScore() {
    const scoreStyle = {font: `35px Alfa Slab One`, fill: `#9CEFE6`, align: `center`, transform: `skewY(-8deg)`};
    this.label = this.game.add.text(this.mixerxPos - 120, this.game.height - 420, `${this.score}`, scoreStyle);
    this.label.anchor.setTo(0.5);
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
    this.mixer = this.game.add.sprite(this.mixerxPos - 105, this.game.height - 300, this.mixerName);
    this.mixer.anchor.setTo(.5);
    this.mixer.scale.setTo(.5);
  }

  addMixerBottom() {
    this.mixerBottom = this.game.add.sprite(this.mixerBottomxPos, this.game.height - 102, this.mixerBottomName);
    this.mixerBottom.anchor.setTo(.5);
    this.mixerBottom.scale.setTo(.5);
  }

}

module.exports = Player;
