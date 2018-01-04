class Menu extends Phaser.State {

  create() {
    this.createBackground();
    this.createTitle();
    this.createScene();
    this.createButtons();
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
    this.createOnePlayerButton();
    this.createTwoPlayerButton();
    this.createThreePlayerButton();
  }

  createOnePlayerButton() {
    this.onePlayer = this.add.sprite(this.world.centerX - 600, this.game.height - 250, `1player`);
    this.onePlayer.anchor.setTo(.5);
    this.onePlayer.scale.setTo(.5);
    this.onePlayer.enableBody = true;
    this.onePlayer.playerAmount = 1;
    this.physics.arcade.enableBody(this.onePlayer);
    this.game.add.tween(this.onePlayer).to({y: this.game.height - 260}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
  }

  createTwoPlayerButton() {
    this.twoPlayer = this.add.sprite(this.world.centerX, this.game.height - 250, `2players`);
    this.twoPlayer.anchor.setTo(.5);
    this.twoPlayer.scale.setTo(.5);
    this.twoPlayer.enableBody = true;
    this.twoPlayer.playerAmount = 2;
    this.physics.arcade.enableBody(this.twoPlayer);
    this.game.add.tween(this.twoPlayer).to({y: this.game.height - 270}, 2200, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
  }

  createThreePlayerButton() {
    this.threePlayer = this.add.sprite(this.world.centerX + 600, this.game.height - 250, `3players`);
    this.threePlayer.anchor.setTo(.5);
    this.threePlayer.scale.setTo(.5);
    this.threePlayer.enableBody = true;
    this.threePlayer.playerAmount = 3;
    this.physics.arcade.enableBody(this.threePlayer);
    this.game.add.tween(this.threePlayer).to({y: this.game.height - 280}, 2400, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
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
  //
  // onPressed() {
  //   console.log(`pressed`);
  //   this.checkCollisions();
  // }

  startGame(e) {
    console.log(e.playerAmount);
    // console.log(this.threePlayer.test);
    this.state.start(`Play`, true, false, e.playerAmount);
  }

  update() {
    this.checkCollisions();
    this.playerControlls();
  }

  checkCollisions() {
    this.physics.arcade.overlap(this.onePlayer, this.player, this.startGame, null, this);
    this.physics.arcade.overlap(this.twoPlayer, this.player, this.startGame, null, this);
    this.physics.arcade.overlap(this.threePlayer, this.player, this.startGame, null, this);
  }

  playerControlls() {
    // const xPos = this.game.oscData.xPosControllerOne;
    // const yPos = this.game.oscData.yPosControllerOne;
    const xPos = this.game.input.x;
    const yPos = this.game.input.y;
    this.player.x = xPos;
    this.player.y = yPos;
  }
}

module.exports = Menu;
