var Ship = require('./ship');
var Bullet = require('./bullet');
var Game = require('./game');
var Common = require('./common');
var nowjs = require('now');
var started = false;

module.exports = function(app) {
  var game = new Game();

  var everyone = nowjs.initialize(app);
  var clients = [];

  everyone.now.moveUp = function(id) {
    console.log('move up');
    clients[id].setNewOrientation([0, -1]);
  };
  everyone.now.moveDown = function(id) {
    console.log('move down');
    clients[id].setNewOrientation([0, 1]);
  };
  everyone.now.moveLeft = function(id) {
    console.log('move left');
    clients[id].setNewOrientation([-1, 0]);
  };
  everyone.now.moveRight = function(id) {
    console.log('move right');
    clients[id].setNewOrientation([1, 0]);
  };
  everyone.now.fire = function(id, orientation) {
    game.fire(clients[id], orientation);
  }
  /** Game loop */
  var count = 0;
  var onFrameUpdate = function(timeElapsed) {
  };
  var onStepUpdate = function(timeElapsed) {
    game.update(timeElapsed);
    if(started) {
      everyone.now.OnRender(JSON.stringify(game.ships), JSON.stringify(game.bullets));
    }
  };
  var onRender = function() {
  };

  nowjs.on('connect', function() {
    started = true;
    var ship = new Ship([800 * Math.random(), 600 * Math.random()], this.user.clientId);
    game.addShip(ship);
    clients[this.user.clientId] = ship;
    this.now.OnConnect(this.user.clientId);
    //JSON.stringify(ship));//this.user.clientId);
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
