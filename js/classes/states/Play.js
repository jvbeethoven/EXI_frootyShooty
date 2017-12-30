const SPACE_MIN_X = 50;
const SPACE_MAX_X = 1920 - 50;
const VELOCITY_MIN = 300;
const VELOCITY_MAX = 600;
// const FRUIT_INTERVAL = 100;
// const TARGET_INTERVAL = 200;
const TARGET_INTERVAL = Math.floor(Math.random() * (5000 - 2500 + 1) + 1000);
let PLAYER_1 = 0;
const SHOOT = false;


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
    this.spawnTargets();
    this.createForeground();
    this.playerOne();
    this.playerTwo();
    this.playerThree();
    this.createPlayers();
    this.game.physics.setBoundsToWorld();
  }

  playerOne() {
    console.log(`playerOne`);
    this.mixerOne = this.add.sprite(360, this.game.height - 300, `mixer-1`);
    this.mixerOne.anchor.setTo(.5);
  }

  playerTwo() {
    this.mixerTwo = this.add.sprite(920, this.game.height - 300, `mixer-2`);
    this.mixerTwo.anchor.setTo(.5);
  }

  playerThree() {
    this.mixerThree = this.add.sprite(1485, this.game.height - 300, `mixer-3`);
    this.mixerThree.anchor.setTo(.5);
  }

  onPressed() {
    this.physics.arcade.overlap(this.player, this.fruit, this.addScore, null, this);
    this.physics.arcade.overlap(this.player, this.fruit, this.removeScore, null, this);
  }

  createPlayers() {
    this.player = this.add.sprite(100, 100, `player-1`);
    this.player.anchor.setTo(.5);
    this.player.scale.setTo(1);
    this.physics.arcade.enableBody(this.player);
  }

  createForeground() {
    this.foreground = this.add.sprite(0, this.game.height, `foreground`);
    this.foreground.anchor.setTo(0, 1);
  }

  createBackground() {
    this.background = this.add.tileSprite(0, 100, this.game.width, 241, `clouds`);
    this.background.autoScroll(- 20, 0);
  }

  createEnemies() {
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.enemies.createMultiple(2, [`badfruit-1`, `badfruit-2`]);
    this.enemies.setAll(`anchor.x`, 0.5);
    this.enemies.setAll(`anchor.y`, 0.5);
    // this.enemies.setAll(`scale`, 0.5);
    this.enemies.angle ++;
    this.enemies.setAll(`checkWorldBounds`, true);
    this.enemies.setAll(`outOfBoundsKill`, true);
    this.physics.arcade.enableBody(this.enemies);
  }

  createFruit() {
    this.fruit = this.add.group();
    this.fruit.enableBody = true;
    this.fruit.createMultiple(1, [`fruit-4`, `fruit-3`, `fruit-2`, `fruit-1`]);
    this.fruit.setAll(`anchor.x`, 0.5);
    this.fruit.setAll(`anchor.y`, 0.5);
    this.fruit.setAll(`checkWorldBounds`, true);
    this.fruit.setAll(`outOfBoundsKill`, true);
    this.physics.arcade.enableBody(this.fruit);
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

    const enemyX = this.rnd.integerInRange(SPACE_MIN_X, SPACE_MAX_X);
    const velocityY = this.rnd.integerInRange(- VELOCITY_MIN, - VELOCITY_MAX);
    enemy.reset(enemyX, 0);
    enemy.body.velocity.set(0, - velocityY);
  }

  addFruit() {
    const fruit = this.fruit.getFirstDead();
    if (!fruit) {
      return;
    } else {
      const randomFruit = this.fruit.children[Math.floor(Math.random() * this.fruit.children.length)];
      const fruitX = this.rnd.integerInRange(SPACE_MIN_X, SPACE_MAX_X);
      const velocityY = this.rnd.integerInRange(- VELOCITY_MIN, - VELOCITY_MAX);
      randomFruit.reset(fruitX, 0);
      randomFruit.body.velocity.set(0, - velocityY);
    }
  }

  update() {
    // console.log(OscData.playerControlls, `playerControlls`);
    const xPos = this.game.oscData.xPosController;
    const yPos = this.game.oscData.yPosController;
    // const xPos = this.game.input.x;
    // const yPos = this.game.input.y;
    this.player.x = xPos;
    this.player.y = yPos;

    this.checkCollisions();
    // this.randomItem = this.randomTarget[Math.floor(Math.random() * this.randomTarget.length)];
  }

  addScore() {
    PLAYER_1 ++;
    console.log(PLAYER_1);
  }

  removeScore() {
    PLAYER_1 --;
    console.log(PLAYER_1);
  }

  checkCollisions() {
    // if (SHOOT === true) {
    //   this.physics.arcade.overlap(this.player, this.fruit, this.addScore, null, this);
    //   this.physics.arcade.overlap(this.player, this.fruit, this.removeScore, null, this);
    // }
  }

  render() {

  }

  shutdown() {

  }
}

module.exports = Play;
