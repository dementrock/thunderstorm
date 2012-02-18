module.exports = function(app) {
  var everyone = require('now').initialize(app);

  everyone.now.moveUp = function(ship) {
    console.log('move up');
  };
  everyone.now.moveDown = function(ship) {
    console.log('move down');
  };
  everyone.now.moveLeft = function(ship) {
    console.log('move left');
  };
  everyone.now.moveRight = function(ship) {
    console.log('move right');
  };
  
  /** Game loop */
  var count = 0;
  var onFrameUpdate = function(timeElapsed) {
    //console.log('frame: ', timeElapsed)
  };
  var onStepUpdate = function(timeElapsed) {
    console.log(count++, ':', timeElapsed)
  };
  var onRender = function() {

  };
  require('./gameloop')(onFrameUpdate, onStepUpdate, onRender);
}