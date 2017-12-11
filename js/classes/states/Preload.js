class Preload extends Phaser.State {
  init() {
    const style = {font: `20px Arial`, fill: `#fff`, align: `center`};
    this.label = this.add.text(this.world.centerX, this.world.centerY, `0%`, style);
    this.label.anchor.setTo(0.5, 0.5);
    console.log(`preload`);
  }

  preload() {
    this.game.stage.backgroundColor = `#00cbff`;
    this.load.image(`bg`, `assets/images/bg-moon.jpg`);
    this.load.atlas(`components`, `assets/components/components.png`, `assets/components/components.json`);
  }

  loadUpdate() {
    console.log(`loadUpdate: ${this.load.progress}`);
    this.label.text = `${this.load.progress}%`;
  }

  create() {
    console.log(`[PreloadState] create`);
    this.state.start(`Menu`);
    // this.state.start(`Play`);
  }
}

module.exports = Preload;
