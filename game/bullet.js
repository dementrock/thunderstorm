var Common = require('./common');

function Bullet(position, speed, orientation) {
  this.speed = 200;
  this.orientation = Common.normalize(orientation);
  this.position = position;
  this.isAlive = true;
  this.lifeTime = 2;
  this.radius = 3;
  this.damageValue = 10;
}

Bullet.rawSpeed = 500;

Bullet.prototype = {
  update: function(timeElapsed) {
    this.lifeTime -= timeElapsed;
    if (this.lifeTime < 0) {
      this.isAlive = false;
    }    
    var px = this.position[0], py = this.position[1];
    var ox = this.orientation[0], oy = this.orientation[1];
    this.position = [px + ox * Bullet.rawSpeed * timeElapsed,
      py + oy * Bullet.rawSpeed * timeElapsed];
  },
  // bullet does not turn!

  destroy: function() {
    this.isAlive = false;
  },
  getSpeed: function() {
    return this.speed;
  },
  getVelocity: function() {
    return [this.orientation[0] * this.speed, this.orientation[1] * this.speed];
  },
  getOrientation: function() {
    return this.orientation;
  },
  getPosition: function() {
    return this.position;
  },
  getRadius: function() {
    return this.radius;
  },
};

module.exports = Bullet;
