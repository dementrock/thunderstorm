var Common = require('./common');

function Bullet(position, speed, orientation) {
  this.speed = 200;
  this.orientation = Common.normalize(orientation);
  this.position = position;
  this.isAlive = true;
  this.radius = 3;
  this.damageValue = 10;
}

Bullet.rawSpeed = 20000;

Bullet.prototype = {
  update: function(timeElapsed) {
    if (this.isAlive) {
        var px = this.position[0], py = this.position[1];
        var ox = this.orientation[0], oy = this.orientation[1];
        console.log(timeElapsed);
        var newx = px + ox * this.speed * timeElapsed, newy = py + oy * this.speed * timeElapsed;
        if (newx <= 0 || newx >= WIDTH || newy <= 0 || newy >= HEIGHT) {
            this.isAlive = false;
        }
        this.position = [newx, newy];
    }
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
