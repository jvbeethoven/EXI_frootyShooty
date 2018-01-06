class Video extends Phaser.State {

  create() {
    this.startVideo();
  }

  startVideo() {
    this.video = this.game.add.video(`introScene`);
    this.video.play(true);
    this.sprite = this.video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 1, 1);
    this.video.loop = false;
    this.video.onComplete.add(this.deleteVideo, this);
  }

  deleteVideo() {
    console.log(`go to menu state`);
    this.state.start(`PlayEnd`);
  }
}

module.exports = Video;
