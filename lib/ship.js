function Ship(position, player) {
    this.speed = 0;
    this.orientation = [0, 1]; // default orientation
    this.position = position;
    this.player = player;
}

Ship.prototype = {
    maxSpeed: 10, 
    
    _velocity: new Velocity(),
    //orientation: [0, 1],
    //speed: 0,

    position: [0, 0],

    hp: 100,
    isAlive: true,
    radius: 5,
    bulletType: normalBullet,
    gunOrientation: [0, 1],
    player: null,

    update:
    function(timeElapsed) {
        this.position = this.position.update(this._velocity.getVelocity(), timeElapsed);
    },

    turn: 
    function(timeElapsed, newOrientation) {
        if (newOrientation === undefined || this.getOrientation().equals(newOrientation)) {
            // increase speed
            var speed = this._velocity.getSpeed();
            speed = Math.min(speed + 1, this.maxSpeed);
            this._velocity.setSpeed(speed);
        } else {
            this._velocity.setOrientation(newOrientation);
            this._velocity.setSpeed(0);
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
        return this._velocity.getSpeed();
    },

    getVelocity:
    function() {
        return [this._velocity.getVelocity()];
    },

    getOrientation:
    function() {
        return this._velocity.getOrientation();
    },
};
