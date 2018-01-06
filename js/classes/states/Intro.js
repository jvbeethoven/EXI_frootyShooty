class Menu extends Phaser.State {
  init(numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers;
  }

  create() {
    this.createCountDown();
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

module.exports = Menu;
