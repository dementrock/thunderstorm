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
    clients[id].setNewOrientation([0, -1]);
  };
  everyone.now.moveDown = function(id) {
    clients[id].setNewOrientation([0, 1]);
  };
  everyone.now.moveLeft = function(id) {
    clients[id].setNewOrientation([-1, 0]);
  };
  everyone.now.moveRight = function(id) {
    clients[id].setNewOrientation([1, 0]);
  };
  everyone.now.fire = function(id, orientation) {
    console.log('shoot! with ' + orientation);
    game.fire(clients[id], orientation);
  }
  /** Game loop */
  var count = 0;
  var onFrameUpdate = function(timeElapsed) {
  };
  var onStepUpdate = function(timeElapsed) {
    game.update(timeElapsed);
    if(started) {
      everyone.now.OnRender(JSON.stringify(computeLocations(game.ships)), JSON.stringify(game.bullets));
    }
  };
  var onRender = function() {
  };
  var computeLocations = function(ships) {
    locs = [];
    for(var i in ships) {
      if(ships[i].isAlive) {
        locs.push({
          position: ships[i].position,
          radius: ships[i].radius,
          id : ships[i].id
        });
      }
    }
    return locs;
  }

  nowjs.on('connect', function() {
    started = true;
    var ship = new Ship([800 * Math.random(), 600 * Math.random()], this.user.clientId, this.user.clientId);
    console.log(ship.id);
    game.addShip(ship);
    clients[this.user.clientId] = ship;
    this.now.OnConnect(this.user.clientId);
    //JSON.stringify(ship));//this.user.clientId);
  });

  nowjs.on('disconnect', function() {
    for(var i in clients) {
      if(i == this.user.clientId) {
        game.removeShip(clients[i]);
        delete clients[i];
        break;
      }
    }
  });
  require('./gameloop')(onFrameUpdate, onStepUpdate, onRender);
}