class Preload extends Phaser.State {
  init() {
    const style = {font: `20px Arial`, fill: `#fff`, align: `center`};
    this.label = this.add.text(this.world.centerX, this.world.centerY, `0%`, style);
    this.label.anchor.setTo(0.5, 0.5);
  }
  preload() {
    this.game.stage.backgroundColor = `#00cbff`;
    // this.load.image(`bg`, `assets/images/bg-moon.jpg`);
    // this.load.image(`howto`, `assets/images/howtoplay.png`);
    // this.load.image(`battery`, `assets/images/battery.png`);
    // this.load.image(`star`, `assets/images/star.png`);
    // this.load.image(`title`, `assets/images/jerry.png`);
    // this.load.image(`ground`, `assets/images/moon.png`);
    // this.load.image(`meteor`, `assets/images/meteor.png`, `assets/images/meteor.png`);
    // this.load.atlas(`player`, `assets/images/player.png`, `assets/images/player.json`);
    this.load.atlas(`components`, `assets/components/components.png`, `assets/components/components.json`);
    // this.load.atlas(`stars`, `assets/images/stars.png`, `assets/images/stars.json`);

    // this.load.audio(`coin`, `assets/sounds/coin.mp3`);
    // this.load.audio(`countdown`, `assets/sounds/countdown.wav`);
    // this.load.audio(`go`, `assets/sounds/go.wav`);
    // this.load.audio(`explosion`, `assets/sounds/explosion.wav`);
    // this.load.audio(`jump`, `assets/sounds/jump.wav`);
    // this.load.audio(`intro`, `assets/sounds/spacesound.wav`);
    // this.load.audio(`walk`, `assets/sounds/walk.wav`);
    // this.load.audio(`fuel_low`, `assets/sounds/fuel_low.wav`);
    // this.load.audio(`gameover`, `assets/sounds/gameover.wav`);
  }
  loadUpdate() {
    console.log(`loadUpdate: ${this.load.progress}`);
    this.label.text = `${this.load.progress}%`;
  }
  create() {
    console.log(`[PreloadState] create`);
    // this.state.start(`Menu`);
    this.state.start(`Play`);
  }
}

module.exports = Preload;
