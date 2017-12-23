class Play extends Phaser.State {

  // let players = [];

  init(numberOfPlayers) {
    console.log(numberOfPlayers);

  }

  create() {

    this.game.physics.setBoundsToWorld();

  }

  update() {
    // console.log(OscData.playerControlls, `playerControlls`);
  }

  render() {

  }

  shutdown() {

  }
}

module.exports = Play;
