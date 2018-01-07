const OscData = require(`../plugins/OscData`);

class Boot extends Phaser.State {
  init() {
    this.game.oscData = this.game.plugins.add(OscData);
  }

  create() {
    this.state.start(`Preload`);
  }
}

module.exports = Boot;
