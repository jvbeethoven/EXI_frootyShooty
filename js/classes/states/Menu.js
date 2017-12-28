const Button = require(`../objects/Button`);

class Menu extends Phaser.State {

  create() {
    this.createBackground();
    this.createButtons();
    this.createTitle();
    this.createPlayer();
    this.game.oscData.onButtonPressed.add(this.onPressed);
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, `bg`);
    this.background.autoScroll(- 20, 0);
  }

  createPlayer() {
    this.player = this.add.sprite(100, 100, `red-sight`);
    this.player.anchor.setTo(.5);
    this.player.scale.setTo(.1);
    this.player.enableBody = true;
  }

  createButtons() {
    for (let i = 1;i < 4;i ++) {
      this.buttonPlay = new Button(this.game, this.world.centerX, this.world.centerY - 60 * i, this.buttonPlayClicked, this, `blue`, i);
      this.buttonPlay.anchor.setTo(0.5);
      this.buttonPlay.enableBody = true;
      this.buttonPlay.variable = i;
      this.add.existing(this.buttonPlay);
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
    const numberOfPlayers = i.variable;
    this.state.start(`Play`, true, false, numberOfPlayers);
  }

  onPressed() {
    console.log(this.game.oscData);
  }

  update() {
    this.checkCollisions();
    this.playerControlls();
  }

  checkCollisions() {
    // console.log(this.physics.arcade.overlap(this.player, this.buttonPlay, this.buttonPlayClicked, null, this));
  }

  playerControlls() {
    const xPos = this.game.oscData.xPosController;
    const yPos = this.game.oscData.yPosController;
    this.player.x = xPos;
    this.player.y = yPos;
    // console.log(xPos, yPos);
  }
}

module.exports = Menu;
