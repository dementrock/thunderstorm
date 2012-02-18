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
    //var clients_guns = {};

  everyone.now.moveUpRight = function(id) {
    clients[id].setNewOrientation([1, -1]);
  };
  everyone.now.moveUpLeft = function(id) {
    clients[id].setNewOrientation([-1, -1]);
  };
  everyone.now.moveDownRight = function(id) {
    clients[id].setNewOrientation([1, 1]);
  };
  everyone.now.moveDownLeft = function(id) {
    clients[id].setNewOrientation([-1, 1]);
  };


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
      //console.log('shoot! with ' + orientation);
      game.fire(clients[id], orientation);
      clients[id].fireOrientation = orientation;
  }
  everyone.now.sendChat = function(msg) {
    everyone.now.receiveChat(msg);
  }
  /** Game loop */
  var count = 0;
  var onFrameUpdate = function(timeElapsed) {
  };
  var onStepUpdate = function(timeElapsed) {
    //console.log(count++, timeElapsed);
    game.update(timeElapsed);
    if(started) {
      everyone.now.OnRender(compactShips(game.ships), game.bullets, game.explosions, game.powerups);
    }
  };
  var onRender = function() {
  };
  var compactShips = function(ships) {
    var locs = [];
    for(var i in ships) {
      if(ships[i].isAlive) {
          damaged = false;
          if (ships[i].damagedTurns > 0) {
              ships[i].damagedTurns -= 1;
              damaged = ships[i].damagedTurns % 2;
          }
          locs.push({
              position        : ships[i].position,
              radius          : ships[i].radius,
              id              : ships[i].id,
              hp              : ships[i].hp,
              fullHp          : ships[i].fullHp,
              blink           : damaged,
              bulletRadius    : ships[i].bulletRadius,
              fireOrientation : ships[i].fireOrientation,
          });
      }
    }
    return locs;
  }
  var compactBullets = function(bullets) {
    var bulletlocs = [];
    for(var i in bullets) {
      bulletlocs.push({
        position: bullets[i].position,
        radius: bullets[i].radius,
      });
    }
    return bulletlocs;
  }
  nowjs.on('connect', function() {
    started = true;
    var ship = new Ship([WIDTH * Math.random(), HEIGHT * Math.random()], this.user.clientId, this.user.clientId);
    game.addShip(ship);
    clients[this.user.clientId] = ship;
    this.now.OnConnect(this.user.clientId);
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
