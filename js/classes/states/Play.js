const FRUIT_INTERVAL = 100;
const ENEMY_INTERVAL = 200;
const SPACE_MIN_Y = 50;
const SPACE_MAX_Y = 350;
const VELOCITY_MIN = 300;
const VELOCITY_MAX = 600;
const PLAYER_1 = 0;


class Play extends Phaser.State {

  // let players = [];

  init(numberOfPlayers) {
    console.log(numberOfPlayers);

    console.log(FRUIT_INTERVAL, ENEMY_INTERVAL, PLAYER_1);
  }

  create() {
    this.createBackground();
    this.game.oscData.onButtonPressed.add(this.onPressed);
    this.createEnemies();
    this.createPlayer();
    this.game.physics.setBoundsToWorld();
  }

  onPressed() {
    console.log(`pressed`);
  }

  createPlayer() {
    this.player = this.add.sprite(100, 100, `red-sight`);
    this.player.anchor.setTo(.5);
    this.player.scale.setTo(.1);
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, `bg`);
    this.background.autoScroll(0, 20);
  }

  createEnemies() {
    this.enemy = this.add.sprite(100, 100, `badfruit-1`);
    this.enemy.anchor.setTo(.5);
    this.enemy.scale.setTo(1);
  }

  update() {
    // console.log(OscData.playerControlls, `playerControlls`);
    const xPos = this.game.oscData.xPosController;
    const yPos = this.game.oscData.yPosController;
    this.player.x = xPos;
    this.player.y = yPos;
    // console.log(xPos, yPos);
  }

  render() {

  }

  shutdown() {

  }
}

module.exports = Play;
