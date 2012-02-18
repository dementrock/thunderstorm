var common = require('./common');

function Ship(position, player) {
    this.speed = 0;
    this.orientation = [0, 1]; // default orientation
    this.position = position;
    this.player = player;
}

Ship.prototype = {
    maxSpeed: 10, 
    
    hp: 100,
    isAlive: true,
    radius: 5,
    //bulletType: normalBullet,
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
        if (newOrientation === undefined || common.isSameOrientation(this.orientation, newOrientation)) {
            // increase speed
            this.speed = Math.min(this.speed + timeElapsed, this.maxSpeed);
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

    getHp:
    function() {
        return this.hp;
    },
};

module.exports = Ship;
