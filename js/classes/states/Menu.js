const path = require("path");
const Button = require(path.resolve('js/classes/objects/Button'));

class Menu extends Phaser.State {

  create() {
    this.createBackground();
    this.createButtons();
    this.createTitle();
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, `bg`);
    this.background.autoScroll(- 20, 0);
  }

  createButtons() {
    for (let i = 0;i < 3;i ++) {
      const buttonPlay = new Button(this.game, this.world.centerX, this.world.centerY - 60 * i, this.buttonPlayClicked, this, `blue`, i);
      buttonPlay.anchor.setTo(0.5);
      this.add.existing(buttonPlay);
    }

  }

  createTitle() {
    this.title = this.add.sprite(this.world.centerX, this.world.centerY - 150, `title`);
    this.title.anchor.setTo(0.5);
    const style = {font: `35px Arial`, fill: `#F89BDB`, align: `center`};
    this.label = this.add.text(this.world.centerX, this.world.centerY - 90, `Frootie Shootie`, style);
    this.label.anchor.setTo(0.5);
  }

  buttonPlayClicked(i) {
    // this.state.start(`Intro`);
    console.log(i);
  }

  // checkData() {
  //   console.log(oscData.playerControlls);
  // }
}

module.exports = Menu;
