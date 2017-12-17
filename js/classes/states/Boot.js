const OscData = require(`../plugins/OscData`);

class Boot extends Phaser.State {
  init() {
    // this.oscData = this.game.plugins.add(OscData);
    this.game.oscData = this.game.plugins.add(OscData);
    // console.log(OscData.playerControlls);
    // console.log(this.game);
    // this.state.add(`Play`, Play);
    // console.log(OscData.playerControlls);
    console.log(this.game.oscData);
  }

  create() {
    this.state.start(`Preload`);
    // this.state.start(`Play`);
  }
}

module.exports = Boot;
