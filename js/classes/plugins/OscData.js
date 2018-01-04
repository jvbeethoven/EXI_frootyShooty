const osc = require(`osc`);

class OscData extends Phaser.Plugin {

  constructor(game, parent) {

    super(game, parent, true);

    this.xPosController1 = 0;
    this.yPosController1 = 0;

    this.xPosController2 = 0;
    this.yPosController2 = 0;

    this.xPosController3 = 0;
    this.yPosController3 = 0;


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
      this.onButtonPressed.dispatch(1);
    }
    if (oscMessage.address === `/wii/2/button/B` && oscMessage.args[0] === 1) {
      this.onButtonPressed.dispatch(2);
    }
    if (oscMessage.address === `/wii/3/button/B` && oscMessage.args[0] === 1) {
      this.onButtonPressed.dispatch(3);
    }
  }

  checkPosController(oscMessage) {
    if (oscMessage.address === `/wii/1/ir`) {
      this.xPosController1 = this.mapValues(oscMessage.args[0], 0, 1, 0, window.innerWidth);
      this.yPosController1 = this.mapValues(oscMessage.args[1], 1, 0, 0, window.innerHeight);
    }
    if (oscMessage.address === `/wii/2/ir`) {
      this.xPosController2 = this.mapValues(oscMessage.args[0], 0, 1, 0, window.innerWidth);
      this.yPosController2 = this.mapValues(oscMessage.args[1], 1, 0, 0, window.innerHeight);
    }
    if (oscMessage.address === `/wii/3/ir`) {
      this.xPosController3 = this.mapValues(oscMessage.args[0], 0, 1, 0, window.innerWidth);
      this.yPosController3 = this.mapValues(oscMessage.args[1], 1, 0, 0, window.innerHeight);
    }

  }

  mapValues(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }


}

module.exports = OscData;
