class Play extends Phaser.State {

  // let players = [];

  init() {

    // console.log(players);
    console.log('play');

  }

  create() {

    this.game.physics.setBoundsToWorld();

  }

  update() {
    console.log(OscData.playerControlls, `playerControlls`);
  }

  render() {

  }

  shutdown() {

  }
}

module.exports = Play;
