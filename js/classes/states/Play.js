const Player = require(`../objects/Player`);
const SPACE_MIN_X = 50;
const SPACE_MAX_X = 1920 - 50;
const VELOCITY_MIN = 300;
const VELOCITY_MAX = 600;
const TARGET_INTERVAL = Math.floor(Math.random() * (5000 - 2500 + 1) + 1000);
class Play extends Phaser.State {

  init(i) {
    this.numberOfPlayers = i;
    this.gameEnded = false;
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.loadSounds();
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
    this.updateScore();
    this.game.physics.setBoundsToWorld();
  }

  loadSounds() {
    this.shoot = this.add.audio(`shoot`);
    this.hit = this.add.audio(`mixer`);
    this.badHit = this.add.audio(`pop`);
  }

  mixerOne() {
    this.mixerOne = this.add.sprite(360, this.game.height - 300, `mixer-1`);
    this.mixerOne.anchor.setTo(.5);
    this.mixerOne.scale.setTo(.5);
  }

  mixerTwo() {
    this.mixerTwo = this.add.sprite(920, this.game.height - 300, `mixer-2`);
    this.mixerTwo.anchor.setTo(.5);
    this.mixerTwo.scale.setTo(.5);
  }

  mixerThree() {
    this.mixerThree = this.add.sprite(1485, this.game.height - 300, `mixer-3`);
    this.mixerThree.anchor.setTo(.5);
    this.mixerThree.scale.setTo(.5);
  }


  updateScore() {
    const scoreStyle = {font: `35px Alfa Slab One`, fill: `#9CEFE6`, align: `center`, transform: `skewY(-8deg)`};

    if (this.players[2]) {
      this.labelOne = this.add.text(345, this.game.height - 420, `${this.players[0].score}`, scoreStyle);
      this.labelOne.anchor.setTo(0.5);
    }
    if (this.players[1]) {
      this.labelTwo = this.add.text(900, this.game.height - 420, `${this.players[1].score}`, scoreStyle);
      this.labelTwo.anchor.setTo(0.5);

    }
    if (this.players[2]) {
      this.labelThree = this.add.text(1470, this.game.height - 420, `${this.players[2].score}`, scoreStyle);
      this.labelThree.anchor.setTo(0.5);
    }
  }

  createPlayers() {
    this.players = [];
    for (let i = 0;i < this.numberOfPlayers;i ++) {
      this.players[i] = new Player(this.game, this.world.width / 2, 200 * i, `player-${i + 1}`);
      this.game.add.existing(this.players[i]);
    }
  }

  onPressed(e) {

    this.shoot.play();

    if (e === 1) {
      this.game.physics.arcade.overlap(this.players[0], this.fruit, this.addScore, null, this);
      this.game.physics.arcade.overlap(this.players[0], this.enemies, this.removeScore, null, this);
    }

    if (e === 2) {
      this.game.physics.arcade.overlap(this.players[1], this.fruit, this.addScore, null, this);
      this.game.physics.arcade.overlap(this.players[1], this.enemies, this.removeScore, null, this);
    }

    if (e === 3) {
      this.game.physics.arcade.overlap(this.players[2], this.fruit, this.addScore, null, this);
      this.game.physics.arcade.overlap(this.players[2], this.enemies, this.removeScore, null, this);
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
    if (this.players[0]) {
      this.players[0].x = this.game.oscData.xPosController1;
      this.players[0].y = this.game.oscData.yPosController1;
    }
    if (this.players[1]) {
      this.players[1].x = this.game.oscData.xPosController2;
      this.players[1].y = this.game.oscData.yPosController2;
    }
    if (this.players[2]) {
      this.players[2].x = this.game.oscData.xPosController3;
      this.players[2].y = this.game.oscData.yPosController3;
    }
  }

  addScore(e) {
    this.randomFruit.kill();
    this.hit.play();

    if (e.score >= 10) {
      return;
    } else {
      e.score += 1;
    }

    if (e.key === `player-1`) {
      this.mixerOne.frame = e.score;
      if (this.players[0]) {
        this.players[0].score = e.score * 10;
      }

    } else if (e.key === `player-2`) {
      this.mixerTwo.frame = e.score;
      if (this.players[1]) {
        this.players[1].score = e.score * 10;
      }
    } else if (e.key === `player-3`) {
      this.mixerThree.frame = e.score;
      if (this.players[2]) {
        this.players[2].score = e.score * 10;
      }
    }
    if (this.labelOne) {
      this.labelOne.kill();
    }

    if (this.labelTwo) {
      this.labelTwo.kill();
    }

    if (this.labelThree) {
      this.labelThree.kill();
    }

    this.updateScore();
  }

  removeScore(e) {
    this.randomEnemy.kill();

    this.badHit.play();

    if (e.score <= 0) {
      e.score = 0;
      return;
    } else {
      e.score -= 1;
    }

    if (e.key === `player-1`) {
      this.mixerOne.frame = e.score;
      if (this.players[0]) {
        this.players[0].score = e.score * 10;
      }
    } else if (e.key === `player-2`) {
      this.mixerTwo.frame = e.score;
      if (this.players[1]) {
        this.players[1].score = e.score * 10;
      }
    } else if (e.key === `player-3`) {
      this.mixerThree.frame = e.score;
      if (this.players[2]) {
        this.players[2].score = e.score * 10;
      }
    }

    if (this.labelOne) {
      this.labelOne.kill();
    }

    if (this.labelTwo) {
      this.labelTwo.kill();
    }

    if (this.labelThree) {
      this.labelThree.kill();
    }

    this.updateScore();
  }
}

module.exports = Play;
