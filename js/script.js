{
  // const Phaser = require('phaser');
  const path = require("path");
  const Game = require(path.resolve('js/classes/game'));
  const osc = require('osc');
  // const PIXI = require('phaser/build/custom/pixi');
  // const p2 = require('phaser/build/custom/p2');
  // const Phaser = require('phaser/build/custom/phaser-split');
  // const Game = require('../classes/Game');

  const init = () => {
    oscData();
    new Game();
  };

  const oscData = () => {
    // oproepen van data uit OSCulator
    let udpPort = new osc.UDPPort({
        localAddress: "127.0.0.1",
        localPort: 7501
    });
    udpPort.on("ready", () => {
      console.log("Listening for OSC over UDP.");
    });
    // Data oproepen
    udpPort.on("message", oscMessage => {
      playerControlls(oscMessage);
      // console.log(oscMessage);
    });
    udpPort.on("error", err => {
        console.log(err);
    });
    udpPort.open();
  };

  const playerControlls = (oscMessage) => {
    console.log(oscMessage);
    // new Game(oscMessage);
  };

  init();
}
