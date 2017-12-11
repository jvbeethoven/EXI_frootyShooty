const osc = require(`osc`);

class OscData extends Phaser.Plugin {

  constructor(game, parent) {

    super(game, parent);

    this.buttonBPressed = false;
    this.xPosController = 0;
    this.yPosController = 0;


    // oproepen van data uit OSCulator
    const udpPort = new osc.UDPPort({
      localAddress: `127.0.0.1`,
      localPort: 7501
    });

    udpPort.on(`ready`, () => {
      console.log(`Listening for OSC over UDP.`);
    });

    // Data oproepen
    udpPort.on(`message`, oscMessage => {
      this.playerControlls(oscMessage);
    });

    udpPort.on(`error`, err => {
      console.log(err);
    });

    udpPort.open();
  }

  playerControlls(oscMessage) {
    // console.log(oscMessage.args);
    if (oscMessage.address === `/wii/1/button/B`) {
      console.log(`buttonBPressed`);
    }
    // console.log(oscMessage.args[0]);
    // console.log(oscMessage);
    // new Game(oscMessage);
  }

}

module.exports = OscData;
