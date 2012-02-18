function Position(x, y) {
    this.x = x;
    this.y = y;
}

Position.prototype = {
    update:
    function(velocity, time) {
        this.x += velocity.x * time;
        this.y += velocity.y * time;
    },
}

function Velocity(initial_x, initial_y, initial_speed) {
    // initial_x, initial_y takes the normalized orientation, not the velocity vector!
    this.speed = this.x = this.y = 0;
    if (initial_speed !== undefined) {
        this.speed = initial_speed;
    }
    if (initial_x !== undefined && initial_y !== undefined) {
        this.x = initial_x;
        this.y = initial_y;
    }
}

Velocity.prototype = {
    getOrientation:
    function() {
        return [this.x, this.y];
    },
    
    getVelocity:
    function() {
        return [this.x * this.speed, this.y * this.speed];
    },

    getSpeed:
    function() {
        return this.speed;
    },

    setOrientation
}
