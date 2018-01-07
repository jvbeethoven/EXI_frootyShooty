class Intro extends Phaser.State {
  init(numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers;
  }

  create() {
    // this.createCountDown();
    this.startVideo();
  }

  startVideo() {
    this.video = this.game.add.video(`explainer`);
    this.video.play(true);
    this.sprite = this.video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 1, 1);
    this.video.loop = false;
    this.video.onComplete.add(this.deleteVideo, this);
  }

  deleteVideo() {
    console.log(`go to menu state`);
    this.state.start(`Play`, true, false, this.numberOfPlayers);
  }

  createCountDown() {
    //replace with video if ready
    this.countDownValue = 3;
    this.countDownTimer = this.time.events.repeat(1000, this.countDownValue, this.countDown, this);
  }

  countDown() {
    this.countDownValue --;
    console.log(this.countDownValue);
    if (this.countDownValue === 0) {
      this.state.start(`Play`, true, false, this.numberOfPlayers);
    }
  }
}

module.exports = Intro;
