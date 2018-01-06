const Button = require(`../objects/Button`);
class Menu extends Phaser.State {

  create() {
    this.maxPlayers = 3;
    this.createBackground();
    this.createButtons();
    this.createPlayer();
    this.createTitle();
    this.createScene();
    this.game.oscData.onButtonPressed.add(this.onPressed, this);
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
    this.player = this.add.sprite(this.game.width / 2, this.game.height / 2, `player-1`);
    this.player.anchor.setTo(.5);
    this.player.scale.setTo(.5);
    this.player.enableBody = true;
    this.physics.arcade.enableBody(this.player);
    this.add.existing(this.player);
  }

  createButtons() {
    this.buttons = [];
    for (let i = 0;i < this.maxPlayers;i ++) {
      this.buttons[i] = new Button(this.game, this.world.centerX - 1200 + (600 * (i + 1)), this.game.height - 250, `${i + 1}player`, ``, i + 1);
      this.game.add.existing(this.buttons[i]);
    }
  }

  createTitle() {
    this.title = this.add.sprite(this.world.centerX, this.world.centerY - 50, `menu-text`);
    this.title.anchor.setTo(0.5);
    this.title.scale.setTo(0.5);
  }

  buttonClicked(e) {
    this.state.start(`Play`, true, false, e.variable);
  }

  onPressed(e) {
    if (e === 1) {
      for (const button in this.buttons) {
        this.game.physics.arcade.overlap(this.buttons[button - 1], this.player, this.buttonClicked, null, this);
      }
    }
  }

  update() {
    this.playerControlls();
  }

  playerControlls() {
    this.player.x = this.game.oscData.xPosController1;
    this.player.y = this.game.oscData.yPosController1;
  }
}

module.exports = Menu;
