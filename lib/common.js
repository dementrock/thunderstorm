export.normalize = function(v) {
    var x = v[0], y = v[1];
    var norm = Math.sqrt(x*x + y*y);
    return [x / norm, y / norm];
}

var assert = require('assert');

Pos.prototype = {
    update:
    function(velocity, time) {
        this.x += velocity.x * time;
        this.y += velocity.y * time;
    },
}

function Velocity(initial_x, initial_y, initial_speed) {
    // initial_x, initial_y takes the normalized orientation, not the velocity vector!
    this.speed = 0;
    this.pos = new Pos(0, 0);
    if (initial_speed !== undefined) {
        this.speed = initial_speed;
    }
    if (initial_x !== undefined && initial_y !== undefined) {
        this.pos = new Pos(initial_x, initial_y);
    }
}

Velocity.prototype = {
    getOrientation:
    function() {
        return this.o;
    },
    
    getVelocity:
    function() {
        return [this.o.x * this.speed, this.o.y * this.speed];
    },

    getSpeed:
    function() {
        return this.speed;
    },

    setOrientation:
    function(o) {
        var x = o[0], y = o[1];
        var norm = Math.sqrt(x*x + y*y);
        this.x = x / norm;
        this.y = y / norm;
    },

    setSpeed:
    function(speed) {
        assert.ok(speed >= 0);
        this.speed = speed;
    },

    setVelocity(velocity) {
        var x = velocity[0], y = velocity[1];
        this.speed = Math.sqrt(x*x + y*y);
        this.x = x / this.speed;
        this.y = y / this.speed;
    },
}
