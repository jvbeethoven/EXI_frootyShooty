const SPACE_MIN_X = 50;
const SPACE_MAX_X = 1920 - 50;
const VELOCITY_MIN = 300;
const VELOCITY_MAX = 600;
// const FRUIT_INTERVAL = 100;
// const TARGET_INTERVAL = 200;
const TARGET_INTERVAL = Math.floor(Math.random() * (5000 - 2500 + 1) + 1000);

class Play extends Phaser.State {

  // let players = [];

  init() {
    this.gameEnded = false;
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.createBackground();
    this.game.oscData.onButtonPressed.add(this.onPressed, this);
    this.createEnemies();
    this.createFruit();
    this.spawnTargets();
    this.createForeground();
    this.mixerOne();
    this.mixerTwo();
    this.mixerThree();
    this.createPlayers();
    this.game.physics.setBoundsToWorld();
  }

  mixerOne() {
    this.mixerOne = this.add.sprite(360, this.game.height - 300, `mixer-1`);
    this.mixerOne.anchor.setTo(.5);
  }

  mixerTwo() {
    this.mixerTwo = this.add.sprite(920, this.game.height - 300, `mixer-2`);
    this.mixerTwo.anchor.setTo(.5);
  }

  mixerThree() {
    this.mixerThree = this.add.sprite(1485, this.game.height - 300, `mixer-3`);
    this.mixerThree.anchor.setTo(.5);
  }


  createPlayers() {
    this.playerOne = this.add.sprite(this.game.width / 2, this.game.height / 2, `player-1`);
    this.physics.arcade.enableBody(this.playerOne);
    this.playerOne.score = 0;

    this.playerTwo = this.add.sprite(this.game.width / 2, this.game.height / 2, `player-2`);
    this.physics.arcade.enableBody(this.playerTwo);
    this.playerTwo.score = 0;

    this.playerThree = this.add.sprite(this.game.width / 2, this.game.height / 2, `player-3`);
    this.physics.arcade.enableBody(this.playerThree);
    this.playerThree.score = 0;

    // this.playerTwo = new Player(this.game, 100, 100);
    // this.playerThree = new Player(this.game, 100, 100);
  }

  onPressed(e) {

    if (e === 1) {
      this.game.physics.arcade.overlap(this.playerOne, this.fruit, this.addScore, null, this);
      this.game.physics.arcade.overlap(this.playerOne, this.enemies, this.removeScore, null, this);
    }

    if (e === 2) {
      this.game.physics.arcade.overlap(this.playerTwo, this.fruit, this.addScore, null, this);
      this.game.physics.arcade.overlap(this.playerThree, this.enemies, this.removeScore, null, this);
    }

    if (e === 3) {
      this.game.physics.arcade.overlap(this.playerThree, this.fruit, this.addScore, null, this);
      this.game.physics.arcade.overlap(this.playerThree, this.enemies, this.removeScore, null, this);
    }
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
    } else {
      this.randomEnemy = this.enemies.children[Math.floor(Math.random() * this.enemies.children.length)];
      const enemyX = this.rnd.integerInRange(SPACE_MIN_X, SPACE_MAX_X);
      const velocityY = this.rnd.integerInRange(- VELOCITY_MIN, - VELOCITY_MAX);
      this.randomEnemy.reset(enemyX, 0);
      this.randomEnemy.body.velocity.set(0, - velocityY);
    }
  }

  addFruit() {
    const fruit = this.fruit.getFirstDead();
    if (!fruit) {
      return;
    } else {
      this.randomFruit = this.fruit.children[Math.floor(Math.random() * this.fruit.children.length)];
      const fruitX = this.rnd.integerInRange(SPACE_MIN_X, SPACE_MAX_X);
      const velocityY = this.rnd.integerInRange(- VELOCITY_MIN, - VELOCITY_MAX);
      this.randomFruit.reset(fruitX, 0);
      this.randomFruit.body.velocity.set(0, - velocityY);
    }
  }

  update() {

    this.updatePlayerPositions();
  }

  updatePlayerPositions() {
    const xPosOne = this.game.oscData.xPosControllerOne;
    const yPosOne = this.game.oscData.yPosControllerOne;
    this.playerOne.x = xPosOne;
    this.playerOne.y = yPosOne;

    const xPosTwo = this.game.oscData.xPosControllerTwo;
    const yPosTwo = this.game.oscData.yPosControllerTwo;
    this.playerTwo.x = xPosTwo;
    this.playerTwo.y = yPosTwo;

    const xPosThree = this.game.oscData.xPosControllerThree;
    const yPosThree = this.game.oscData.yPosControllerThree;
    this.playerThree.x = xPosThree;
    this.playerThree.y = yPosThree;
  }

  addScore(e) {
    console.log(`hit by ${e.key} and score is ${e.score}`);
    this.randomFruit.kill();
    e.score += 1;
  }

  removeScore(e) {
    console.log(`hit by ${e.key} and score is ${e.score}`);
    this.randomEnemy.kill();
    e.score -= 1;
  }

  render() {

  }

  shutdown() {

  }
}

module.exports = Play;
