const osc = require(`osc`);

class OscData extends Phaser.Plugin {

  constructor(game, parent) {

    super(game, parent, true);

    this.buttonBPressed = false;
    this.xPosController = 0;
    this.yPosController = 0;


    this.onButtonPressed = new Phaser.Signal();

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
    this.checkButtonBPressed(oscMessage);
    this.checkPosController(oscMessage);
  }

  checkButtonBPressed(oscMessage) {
    if (oscMessage.address === `/wii/1/button/B` && oscMessage.args[0] === 1) {
      this.onButtonPressed.dispatch(`pressed`);
    }
  }

  checkPosController(oscMessage) {
    if (oscMessage.address === `/wii/1/ir`) {
      this.xPosController = this.mapValues(oscMessage.args[0], 0, 1, 0, window.innerWidth);
      this.yPosController = this.mapValues(oscMessage.args[1], 1, 0, 0, window.innerHeight);
    }

    // this.xPosController = this.mapValues(this.xPosController, 0, 1, 0, window.innerWidth);
    // this.yPosController = this.mapValues(this.yPosController, 0, 1, 0, window.innerHeight);
    console.log(`y`, this.yPosController, `x`, this.xPosController);
  }

  mapValues(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }


}

module.exports = OscData;