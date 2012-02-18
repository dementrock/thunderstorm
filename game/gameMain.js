var Ship = require('./ship');
var Bullet = require('./bullet');
var Game = require('./game');
var Common = require('./Common');
var nowjs = require('now');
var started = false;

module.exports = function(app) {
  var game = new Game();
  var everyone = nowjs.initialize(app);
  var clients = [];

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
  everyone.now.fire = function(shipGUID, orientation) {
    game.fire(game.getShip(shipGUID), orientation);
  }
  /** Game loop */
  var count = 0;
  var onFrameUpdate = function(timeElapsed) {
  };
  var onStepUpdate = function(timeElapsed) {
    if (started)
      everyone.now.OnRender(JSON.stringify(game.ships));
  };
  var onRender = function() {

  };
  
  nowjs.on('connect', function() {
    started = true;
    clients[this.user.clientId] = {
      x: 0,
      y: 0
    };
  });

  nowjs.on('disconnect', function() {
    for(var i in clients) {
      if(i == this.user.clientId) {
        delete clients[i];
        break;
      }
    }
  });

  require('./gameloop')(onFrameUpdate, onStepUpdate, onRender);
}
