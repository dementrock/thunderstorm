var common = require('./common');

function Bullet(position, speed, orientation) {
    this.speed = speed;
    this.orientation = common.normalize(orientation);
    this.position = position;
}

Bullet.prototype = {
    
    isAlive: true,
    radius: 3,
    damageValue: 10,

    update:
    function(timeElapsed) {
        var px = this.position[0], py = this.position[1];
        var ox = this.orientation[0], oy = this.orientation[1];
        this.position = [px + ox * this.speed * timeElapsed, py + oy * this.speed * timeElapsed];
    },

    
    // bullet does not turn!

    destroy:
    function() {
        this.isAlive = false;
    },

    getSpeed:
    function() {
        return this.speed;
    },

    getVelocity:
    function() {
        return [this.orientation[0] * this.speed, this.orientation[1] * this.speed];
    },

    getOrientation:
    function() {
        return this.orientation;
    },

    getPosition:
    function() {
        return this.position;
    },

    getRadius:
    function() {
        return this.radius;
    },
};

module.exports = Bullet;
