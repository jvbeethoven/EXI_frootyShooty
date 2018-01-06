// const Button = require(`../objects/Button`);
class Menu extends Phaser.State {

  create() {
    this.maxPlayers = 4;
    this.createBackground();
    this.createButtons();
    this.createTitle();
    this.createScene();
    this.createPlayer();
    // this.game.oscData.onButtonPressed.add(this.onPressed);
  }

  createScene() {
    this.logo = this.add.sprite(this.world.centerX, 200, `logo`);
    this.logo.anchor.setTo(.5);
    this.logo.scale.setTo(.5);
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 100, this.game.width, 241, `clouds`);
    this.background.autoScroll(- 20, 0);
  }

  createPlayer() {
    this.player = this.add.sprite(100, 100, `player-1`);
    this.player.anchor.setTo(.5);
    this.player.scale.setTo(1);
    this.player.enableBody = true;
    this.physics.arcade.enableBody(this.player);
  }

  createButtons() {
    for (let i = 1;i < this.maxPlayers;i ++) {
      // const button = new Button(this.game, this.world.centerX, this.world.centerY + 40 * i, this.buttonPlayClicked, this, `blue`, i + 1);
      const button = this.add.sprite(this.world.centerX - 1200 + (600 * i), this.game.height - 250, `${i}player`);
      console.log(button);
      console.log(`${i}player`);
      button.anchor.setTo(0.5);
      this.add.existing(button);
      button.enableBody = true;
      button.variable = i;
      this.physics.arcade.enableBody(button);
      button.scale.setTo(.5);
      console.log(button.variable);
      this.game.add.tween(button).to({y: this.game.height - 260 + (i * 10)}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
    }
  }

  createTitle() {
    // this.title = this.add.sprite(this.world.centerX, this.world.centerY - 150, `title`);
    // this.title.anchor.setTo(0.5);
    // const style = {font: `35px Alfa Slab One`, fill: `white`, align: `center`};
    // this.label = this.add.text(this.world.centerX, 90, `Frootie Shootie`, style);
    // this.label.anchor.setTo(0.5);
    this.title = this.add.sprite(this.world.centerX, this.world.centerY - 50, `menu-text`);
    this.title.anchor.setTo(0.5);
    this.title.scale.setTo(0.5);
  }

  buttonPlayClicked(button) {
    const numberOfPlayers = button.variable;
    this.state.start(`Play`, true, false, numberOfPlayers);
  }
  //
  // startGame() {
  //   this.state.start(`Play`, true, false, this.players);
  // }

  update() {
    this.checkCollisions();
    this.playerControlls();
  }

  checkCollisions() {
    this.physics.arcade.overlap(this.buttonPlay, this.player, this.startGame, null, this);
  }

  playerControlls() {
    const xPos = this.game.oscData.xPosControllerOne;
    const yPos = this.game.oscData.yPosControllerOne;
    this.player.x = xPos;
    this.player.y = yPos;
  }
}

module.exports = Menu;
