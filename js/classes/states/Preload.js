
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
    this.load.image(`red-sight`, `assets/images/sight/red-sight.png`);
    this.load.image(`blue-sight`, `assets/images/sight/blue-sight.png`);
    this.load.image(`yellow-sight`, `assets/images/sight/yellow-sight.png`);
    this.load.atlas(`components`, `assets/components/components.png`, `assets/components/components.json`);
  }

  loadUpdate() {
    this.label.text = `${this.load.progress}%`;
  }

  create() {
    console.log(`[PreloadState] create`);
<<<<<<< HEAD
    this.state.start(`Menu`);
=======
    this.state.start('Play');
>>>>>>> 1219fd7bfe2e1a74f7931978fd3508c5798329a4
  }
}

module.exports = Preload;
