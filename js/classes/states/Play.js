const SPACE_MIN_Y = 50;
const SPACE_MAX_Y = 350;
const VELOCITY_MIN = 300;
const VELOCITY_MAX = 600;
const FRUIT_INTERVAL = 100;
// const ENEMY_INTERVAL = 200;
const ENEMY_INTERVAL = Math.floor(Math.random() * (5000 - 1500 + 1) + 200);
const PLAYER_1 = 0;


class Play extends Phaser.State {

  // let players = [];

  init() {
    this.gameEnded = false;
    console.log(FRUIT_INTERVAL, ENEMY_INTERVAL, PLAYER_1);
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.createBackground();
    this.game.oscData.onButtonPressed.add(this.onPressed);
    this.createEnemies();
    this.createPlayers();
    this.game.physics.setBoundsToWorld();

    // this.ground = new Ground(this.game, 0, 400, this.game.width, 109);
    // this.add.existing(this.ground);
  }

  onPressed() {
    console.log(`pressed`);
  }

  createPlayers() {
    this.player = this.add.sprite(100, 100, `red-sight`);
    this.player.anchor.setTo(.5);
    this.player.scale.setTo(.1);
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, `bg`);
    this.background.autoScroll(0, 20);
  }

  createEnemies() {
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.enemies.createMultiple(2, `badfruit-1`);
    this.enemies.setAll(`anchor.x`, 0.5);
    this.enemies.setAll(`anchor.y`, 0.5);
    // this.enemies.setAll(`scale`, 0.5);
    this.enemies.angle ++;
    this.enemies.setAll(`checkWorldBounds`, true);
    this.enemies.setAll(`outOfBoundsKill`, true);
    this.enemyTimer = this.time.events.loop(ENEMY_INTERVAL, this.addEnemy, this);
  }

  addEnemy() {
    if (this.gameEnded) {
      console.log(`ender`);
      return;
    }
    const enemy = this.enemies.getFirstDead();
    if (!enemy) {
      console.log(`no`);
      return;
    }

    console.log(`test`);
    const enemyY = this.rnd.integerInRange(SPACE_MIN_Y, SPACE_MAX_Y);
    const velocityY = this.rnd.integerInRange(- VELOCITY_MIN, - VELOCITY_MAX);
    enemy.reset(this.game.width, enemyY);
    enemy.body.velocity.set(velocityY, 0);
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
