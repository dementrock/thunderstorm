var Ship = require('./ship');
var Bullet = require('./bullet');
var Game = require('./game');
var Common = require('./common');
var nowjs = require('now');
var started = false;

module.exports = function(app) {
  var game = new Game();

  // var ship_a = new Ship([0, 0], "player");
  // var bullet_a = new Bullet([10, 0], 1, [10, 0]);
  // var bullet_b = new Bullet([0, 10], 1, [0, -1]);
  // var bullet_c = new Bullet([0, 0], 100, [1, 0]);
  // var bullet_d = new Bullet([0, 100], 100, [0, -1]);
// 
  // game.addShip(ship_a);
  // game.addBullet(bullet_a);
  // game.addBullet(bullet_b);
  // game.addBullet(bullet_c);
  // game.addBullet(bullet_d);

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
    if(started) {
      everyone.now.OnRender(JSON.stringify(game.ships), JSON.stringify(game.bullets));
    }
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