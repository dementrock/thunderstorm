var Common = require('./common');

/*typeList = [
    {
        maxSpeed        : 150,
        hp              : 100,
        radius          : 10,
        defaultCoolDown : 0.2,
        bulletRadius    : 3,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 130,
        hp              : 140,
        radius          : 15,
        defaultCoolDown : 0.3,
        bulletRadius    : 4,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 110,
        hp              : 180,
        radius          : 20,
        defaultCoolDown : 0.35,
        bulletRadius    : 5,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 90,
        hp              : 220,
        radius          : 25,
        defaultCoolDown : 0.4,
        bulletRadius    : 6,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 70,
        hp              : 260,
        radius          : 30,
        defaultCoolDown : 0.45,
        bulletRadius    : 7,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 50,
        hp              : 300,
        radius          : 35,
        defaultCoolDown : 0.5,
        bulletRadius    : 9,
        damagedTurns    : 0,
    },
]*/
    
function Powerup(position, type) {
    this.position = position;
    this.isAlive = true;
    this.radius = 10;
    this.type = type;
}

Powerup.prototype = {
    getPosition: function() {
        return this.position;
    },
    getRadius: function() {
        return this.radius;
    },
};


module.exports = Powerup;
