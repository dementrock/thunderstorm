var Common = require('./common');

function Ship(position, player) {
    this.speed = 0;
    this.orientation = [0, 0]; // default orientation
    this.position = position;
    this.player = player;
}

Ship.prototype = {
    maxSpeed: 50, 
    
    hp: 100,
    isAlive: true,
    radius: 10,
    coolDown: 0,
    defaultCoolDown: 1,
    newOrientation: undefined,
    //bulletType: normalBullet,

    player: null,

    getCoolDown:
    function() {
        return this.coolDown;
    },

    resetCoolDown:
    function() {
        this.coolDown = this.defaultCoolDown;
    },

    setNewOrientation:
    function(newOrientation) {
        this.newOrientation = Common.normalize(newOrientation);
    },

    getNewOrientation:
    function() {
        return this.newOrientation;
    },

    update:
    function(timeElapsed) {
        this.turn(timeElapsed);
        var px = this.position[0], py = this.position[1];
        var ox = this.orientation[0], oy = this.orientation[1];
        this.position = [px + ox * this.speed, py + oy * this.speed];
        this.coolDown = Math.max(this.coolDown - timeElapsed, 0);
    },

    turn: 
    function(timeElapsed) {
        if (this.newOrientation === undefined || Common.isSameOrientation(this.orientation, this.newOrientation)) {
            // increase speed
            this.speed = Math.min(this.speed + timeElapsed * this.maxSpeed, this.maxSpeed);
        } else {
            this.orientation = Common.normalize(this.newOrientation);
            this.speed = 0;
        }
        this.newOrientation = undefined;
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

    getRadius:
    function() {
        return this.radius;
    },
};

module.exports = Ship;
