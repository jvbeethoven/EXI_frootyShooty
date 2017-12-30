class Menu extends Phaser.State {

  create() {
    this.createBackground();
    this.createButtons();
    this.createTitle();
    this.createPlayer();
    // this.game.oscData.onButtonPressed.add(this.onPressed);
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, `clouds`);
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
    this.buttonPlay = this.add.sprite(this.world.centerX, this.world.centerY, `mixer-1`);
    this.buttonPlay.anchor.setTo(0.5);
    this.buttonPlay.enableBody = true;
    this.physics.arcade.enableBody(this.buttonPlay);
  }

  createTitle() {
    this.title = this.add.sprite(this.world.centerX, this.world.centerY - 150, `title`);
    this.title.anchor.setTo(0.5);
    const style = {font: `35px Alfa Slab One`, fill: `white`, align: `center`};
    this.label = this.add.text(this.world.centerX, 90, `Frootie Shootie`, style);
    this.label.anchor.setTo(0.5);
  }
  //
  // onPressed() {
  //   console.log(`pressed`);
  //   this.checkCollisions();
  // }

  startGame() {
    this.state.start(`Play`, true, false);
  }

  update() {
    this.checkCollisions();
    this.playerControlls();
  }

  checkCollisions() {
    this.physics.arcade.overlap(this.buttonPlay, this.player, this.startGame, null, this);
  }

  playerControlls() {
    const xPos = this.game.oscData.xPosController;
    const yPos = this.game.oscData.yPosController;
    this.player.x = xPos;
    this.player.y = yPos;
  }
}

module.exports = Menu;
