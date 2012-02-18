var common = require('./lib/common');

function Bullet(position, speed, orientation) {
    this.speed = speed;
    this.orientation = orientation;
    this.position = position;
}

Bullet.prototype = {
    
    isAlive: true,
    radius: 1,
    bulletType: normalBullet,
    gunOrientation: [0, 1],
    player: null,

    update:
    function(timeElapsed) {
        var px = this.position[0], py = this.position[1];
        var ox = this.orientation[0], oy = this.orientation[1];
        this.position = [px + ox * this.speed, py + oy * this.speed];
    },

    turn: 
    function(timeElapsed, newOrientation) {
        if (newOrientation === undefined || this.orientation == newOrientation) {
            // increase speed
            this.speed = Math.min(this.speed + 1, this.maxSpeed);
        } else {
            this.orientation = common.normalize(newOrientation);
            this.speed = 0;
        }
    },

    damage:
    function(damageValue) {
        if (! this.isAlive) {
            return;
        }
        this.hp -= damageValue;
        if (this.hp <= 0) {
            this.hp = 0;
            this.isAlive = false;
        }
    },

    getSpeed:
    function() {
        return speed;
    },

    getVelocity:
    function() {
        return [this.orientation[0] * speed, this.orientation[1] * speed];
    },

    getOrientation:
    function() {
        return this.orientation;
    },
};
