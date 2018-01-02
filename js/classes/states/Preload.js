
class Preload extends Phaser.State {
  init() {
    const style = {font: `20px Alfa Slab One`, fill: `#fff`, align: `center`};
    this.label = this.add.text(this.world.centerX, this.world.centerY, `0%`, style);
    this.label.anchor.setTo(0.5, 0.5);
    console.log(`preload`);
  }

  preload() {
    this.game.stage.backgroundColor = `#33a0ba`;
    this.load.image(`clouds`, `assets/images/clouds.png`);
    this.load.image(`foreground`, `assets/images/foreground.png`);
    this.load.image(`fruit-1`, `assets/images/fruit/fruit-1.png`);
    this.load.image(`fruit-2`, `assets/images/fruit/fruit-2.png`);
    this.load.image(`fruit-3`, `assets/images/fruit/fruit-3.png`);
    this.load.image(`fruit-4`, `assets/images/fruit/fruit-4.png`);
    this.load.image(`badfruit-1`, `assets/images/fruit/badfruit-1.png`);
    this.load.image(`badfruit-2`, `assets/images/fruit/badfruit-2.png`);
    this.load.spritesheet(`mixer-1`, `assets/images/mixer/player-1-mixer.png`, 358, 391, 10);
    this.load.spritesheet(`mixer-2`, `assets/images/mixer/player-2-mixer.png`, 358, 390, 10);
    this.load.spritesheet(`mixer-3`, `assets/images/mixer/player-3-mixer.png`, 358, 391, 10);
    this.load.spritesheet(`player-1`, `assets/images/sight/player-1.png`, 128, 145, 2);
    this.load.spritesheet(`player-2`, `assets/images/sight/player-2.png`, 128, 142, 2);
    this.load.spritesheet(`player-3`, `assets/images/sight/player-3.png`, 128, 146, 2);
    this.load.atlas(`components`, `assets/components/components.png`, `assets/components/components.json`);

    this.load.audio(`shoot`, `assets/sounds/shoot.mp3`);
    this.load.audio(`mixer`, `assets/sounds/mixer.mp3`);
    this.load.audio(`pop`, `assets/sounds/pop.mp3`);
  }

  loadUpdate() {
    this.label.text = `${this.load.progress}%`;
  }

  create() {
    console.log(`[PreloadState] create`);
    // this.state.start(`Menu`);
    this.state.start(`Play`);
  }
}

module.exports = Preload;
