import Button from '../objects/Button';

export default class Menu extends Phaser.State {

  create() {
    this.createBackground();
    this.createButtons();
    this.createTitle();
    this.gameSound = this.sound.play(`intro`, 1, true);
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, `bg`);
    this.background.autoScroll(- 20, 0);
  }

  createButtons() {
    const buttonPlay = new Button(this.game, this.world.centerX, this.world.centerY - 20, this.buttonPlayClicked, this, `blue`, `Play`);
    buttonPlay.anchor.setTo(0.5);
    this.add.existing(buttonPlay);
  }

  createTitle() {
    this.title = this.add.sprite(this.world.centerX, this.world.centerY - 150, `title`);
    this.title.anchor.setTo(0.5);
    const style = {font: `35px Arial`, fill: `#F89BDB`, align: `center`};
    this.label = this.add.text(this.world.centerX, this.world.centerY - 90, `Frootie Shootie`, style);
    this.label.anchor.setTo(0.5);
  }

  buttonPlayClicked() {
    this.state.start(`Intro`);
  }

  shutdown() {
    if (this.gameSound) {
      this.gameSound.destroy();
    }
  }
}
