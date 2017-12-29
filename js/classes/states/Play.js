const SPACE_MIN_Y = 50;
const SPACE_MAX_Y = 350;
const VELOCITY_MIN = 300;
const VELOCITY_MAX = 600;
// const FRUIT_INTERVAL = 100;
// const TARGET_INTERVAL = 200;
const TARGET_INTERVAL = Math.floor(Math.random() * (5000 - 2500 + 1) + 2500);
const PLAYER_1 = 0;


class Play extends Phaser.State {

  // let players = [];

  init() {
    this.gameEnded = false;
    console.log(PLAYER_1);
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.createBackground();
    this.game.oscData.onButtonPressed.add(this.onPressed);
    this.createEnemies();
    this.createFruit();
    this.createPlayers();
    this.spawnTargets();
    this.game.physics.setBoundsToWorld();
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
  }

  createFruit() {
    this.fruit = this.add.group();
    this.fruit.enableBody = true;
    this.fruit.createMultiple(1, `fruit-1`);
    this.fruit.setAll(`anchor.x`, 0.5);
    this.fruit.setAll(`anchor.y`, 0.5);
    this.fruit.setAll(`checkWorldBounds`, true);
    this.fruit.setAll(`outOfBoundsKill`, true);
  }

  spawnTargets() {
    this.timer = this.time.events.loop(TARGET_INTERVAL, this.addItem, this);
  }

  addItem() {
    if (this.gameEnded) {
      return;
    }

    const random = Math.random() >= 0.5;
    if (random) {
      this.addEnemy();
    } else {
      this.addFruit();
    }
  }

  addEnemy() {
    const enemy = this.enemies.getFirstDead();
    if (!enemy) {
      return;
    }

    const enemyY = this.rnd.integerInRange(SPACE_MIN_Y, SPACE_MAX_Y);
    const velocityY = this.rnd.integerInRange(- VELOCITY_MIN, - VELOCITY_MAX);
    enemy.reset(this.game.width, enemyY);
    enemy.body.velocity.set(velocityY, 0);
  }

  addFruit() {
    const fruit = this.fruit.getFirstDead();
    if (!fruit) {
      return;
    }

    const fruitY = this.rnd.integerInRange(SPACE_MIN_Y, SPACE_MAX_Y);
    const velocityY = this.rnd.integerInRange(- VELOCITY_MIN, - VELOCITY_MAX);
    fruit.reset(this.game.width, fruitY);
    fruit.body.velocity.set(velocityY, 0);
  }

  update() {
    // console.log(OscData.playerControlls, `playerControlls`);
    const xPos = this.game.oscData.xPosController;
    const yPos = this.game.oscData.yPosController;
    this.player.x = xPos;
    this.player.y = yPos;
    // this.randomItem = this.randomTarget[Math.floor(Math.random() * this.randomTarget.length)];
  }

  render() {

  }

  shutdown() {

  }
}

module.exports = Play;
