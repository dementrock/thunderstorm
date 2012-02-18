module.exports = function(onFrameUpdate, onStepUpdate, onRender) {
  var FPS = 60;
  // physics step
  var PS = 1 / FPS;
  var last = Date.now() / 1000;
  var accrued = 0.0;

  var gameLoop = function() {
    var now = Date.now() / 1000;
    var dt = now - last;
    last = now;
    accrued += dt;
    if(dt > PS) {
      onStepUpdate(dt - (accrued - PS));
      accrued -= PS;
      while(accrued >= PS) {
        onStepUpdate(PS);
        accrued -= PS;
      }
      dt = accrued;
    } else {
      if(accrued >= PS) {
        onStepUpdate(dt - (accrued - PS));
        accrued -= PS;
        dt = accrued;
      }
    }
    if(dt > 0.0) {
      onFrameUpdate(dt);
    }
    // render images
    onRender();
  }
  var isRunning = true;
  while(isRunning) {
    gameLoop();
  }
}
