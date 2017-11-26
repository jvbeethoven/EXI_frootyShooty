import Game from './classes/Game';

let HEIGHT, WIDTH;

const init = () => {
  new Game();
  window.addEventListener(`resize`, handleWindowResize, false);
};

const handleWindowResize = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  console.log(HEIGHT, WIDTH);
};

init();
