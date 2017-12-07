const tracking = require('./tracking.js');
//
// const laserTracker = () => {
//
//   const colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
//   console.log(colors);
//
// };
//
// module.exports = laserTracker;

const laserTracker = () => {

  let video = document.getElementById('video');
  let canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

  // Get access to the camera
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
      });
  }

  // console.log(tracking.track);

  colors.on('track', function(event) {
    console.log(event);
  if (event.data.length === 0) {
    console.log('no colors were detected in this frame');
  } else {
    event.data.forEach(function(rect) {
      console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
    });
  }
});

  tracking.track(video, colors);

  // tracker.on('track', function(event) {
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //
  //   event.data.forEach(function(rect) {
  //     if (rect.color === 'custom') {
  //       rect.color = tracker.customColor;
  //     }
  //
  //     context.strokeStyle = rect.color;
  //     context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  //     context.font = '11px Helvetica';
  //     context.fillStyle = "#fff";
  //     context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
  //     context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
  //   });
  // });

};

module.exports = laserTracker;
