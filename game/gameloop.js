module.exports = function(onFrameUpdate, onStepUpdate, onRender) {
  var FPS = 30;
  // physics step
  var PS = 1 / FPS;
  var last = Date.now() / 1000;
  var accrued = 0.0;
  var isRunning = false;

  var gameLoop = function() {
    if (!isRunning) {
      isRunning = true;
    } else {
      return;
    }
    var now = Date.now() / 1000;
    var dt = now - last;
    last = now;
    accrued += dt;
    while(accrued >= PS) {
      onStepUpdate(PS);
      accrued -= PS;
    }
    isRunning = false;
  }
  setInterval(gameLoop, 3);
}
