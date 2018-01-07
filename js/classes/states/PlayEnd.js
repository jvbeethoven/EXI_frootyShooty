class PlayEnd extends Phaser.State {

  init(item) {
    this.playerWon = item.variable;
  }

  create() {
    this.startVideo();
  }

  startVideo() {
    this.video = this.game.add.video(`playerWon${this.playerWon}`);
    this.video.play(true);
    this.sprite = this.video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 1, 1);
    this.video.loop = false;
    this.video.onComplete.add(this.deleteVideo, this);
  }

  deleteVideo() {
    this.video.play(false);
    console.log(`go to menu state`);
    this.state.start(`Menu`);
  }
}

module.exports = PlayEnd;
