var Common = require('./common');
var Ship = require('./ship');
var Bullet = require('./bullet');

WIDTH = 800;
HEIGHT = 600;

function Game() {
  this.ships = new Array();
  this.bullets = new Array();
}

Game.prototype = {
  update: function(timeElapsed) {
    // update all ships
    for(var shipIndex in this.ships) {
      var ship = this.ships[shipIndex];
      if(ship.isAlive) {
        ship.update(timeElapsed);
      }
    }
    // update all bullets
    for(var bulletIndex in this.bullets) {
      var bullet = this.bullets[bulletIndex];
      if(bullet.isAlive) {
        bullet.update(timeElapsed);
      }
    }
    // test for intersection between bullets and ships
    for(var bulletIndex in this.bullets) {
      // Put bullet on the out loop because it's possible for one bullet to hit
      // multiple ships
      var bullet = this.bullets[bulletIndex];
      var isHit = false;
      for(var shipIndex in this.ships) {
        var ship = this.ships[shipIndex];
        if (ship.isAlive) {
          if(this.isIntersect(ship, bullet)) {
            ship.damage(bullet.damageValue);
            isHit = true;
          }
        }
      }
      if(isHit) {
        bullet.isAlive = false;
      }
    }
    // test for intersection between ships

    for(var shipIndex in this.ships) {
      var ship_a = this.ships[shipIndex];
      if (ship_a.isAlive) {
        for(var _shipIndex in this.ships) {
          if (_shipIndex == shipIndex) {
            continue;
          }
          var ship_b = this.ships[_shipIndex];
          if (ship_b.isAlive) {
            if (this.isIntersect(ship_a, ship_b)) {
              // fix their positions
              var pos_a = ship_a.getPosition();
              var pos_b = ship_b.getPosition();
              var ra = ship_a.radius, rb = ship_b.radius;
              var xa = pos_a[0], ya = pos_a[1], xb = pos_b[0], yb = pos_b[1];
              var mx = (xa + xb) * 0.5, my = (ya + yb) * 0.5;
              var dxa = xa - mx, dya = ya - my, dxb = xb - mx, dyb = yb - mx;
              var norma = Common.norm([dxa, dya]), normb = Common.norm([dxb, dyb]);
              dxa /= norma; dxa *= ra;
              dya /= norma; dya *= ra;
              dxb /= normb; dxb *= rb;
              dyb /= normb; dyb *= rb;
              ship_a.setPosition([xa + dxa, ya + dya]);
              ship_b.setPosition([xb + dxb, yb + dyb]);
            }
          }
        }
      }
    }

  },
  isIntersect: function(obj1, obj2) {
    return Common.distance(obj1.getPosition(), obj2.getPosition()) <= obj1.getRadius() + obj2.getRadius();
  },
  addShip: function(newShip) {
    this.ships.push(newShip);
  },
  addBullet: function(newBullet) {
    this.bullets.push(newBullet);
  },
  removeShip: function(ship) {
    console.log(this.ships.length);
    var idx = this.ships.indexOf(ship);
    if(idx != -1) this.ships.splice(idx, 1);
    console.log(this.ships.length);
  },
  removeBullet: function(bullet) {
    var idx = this.bullets.indexOf(bullet);
    if(idx != -1) this.bullets.splice(idx, 1);
  },
  fire: function(ship, gunOrientation) {
    if(Common.isEqual(ship.getCoolDown(), 0)) {
        console.log(gunOrientation);
      gunOrientation = Common.normalize(gunOrientation);
      var shipPos = ship.getPosition();
      console.log(gunOrientation);
      console.log('raw speed: '+Bullet.prototype.rawSpeed);
      var bulletVelocity = [gunOrientation[0] * Bullet.prototype.rawSpeed, gunOrientation[1] * Bullet.prototype.rawSpeed];
      var bulletSpeed = Common.norm(bulletVelocity);
      var bulletOrientation = Common.normalize(bulletVelocity);
      var bulletPosition = [shipPos[0] + ship.radius * 2 * bulletOrientation[0], shipPos[1] + ship.radius * 2 * bulletOrientation[1]];
      console.log(bulletPosition);
        console.log("added bullet!");
      this.addBullet(new Bullet(bulletPosition, bulletSpeed, bulletOrientation));
      ship.resetCoolDown();
    }
  },
};

module.exports = Game;
