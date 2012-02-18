var Common = require('./common');

typeList = [
    {
        maxSpeed        : 160,
        hp              : 100,
        radius          : 10,
        defaultCoolDown : 0.5,
        bulletRadius    : 3,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 150,
        hp              : 140,
        radius          : 12,
        defaultCoolDown : 0.6,
        bulletRadius    : 4,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 140,
        hp              : 180,
        radius          : 14,
        defaultCoolDown : 0.7,
        bulletRadius    : 5,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 130,
        hp              : 220,
        radius          : 16,
        defaultCoolDown : 0.8,
        bulletRadius    : 6,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 120,
        hp              : 260,
        radius          : 18,
        defaultCoolDown : 0.9,
        bulletRadius    : 7,
        damagedTurns    : 0,
    },
    {
        maxSpeed        : 110,
        hp              : 300,
        radius          : 20,
        defaultCoolDown : 1,
        bulletRadius    : 8,
        damagedTurns    : 0,
    },
]
    
function Ship(position, player, id) {
    rand = Math.random();
    this.speed = 0;
    this.orientation = [0, 0];
    this.position = position;
    this.player = player;
    this.player = null;
    this.isAlive = true;
    this.coolDown = 0;
    this.id = id;
    this.fireOrientation = null;

    var type = typeList[Math.floor ( Math.random() * typeList.length )];

    this.maxSpeed = type.maxSpeed;
    this.hp = type.hp;
    this.fullHp = type.hp;
    this.radius = type.radius;
    this.defaultCoolDown = type.defaultCoolDown;
    this.bulletRadius = type.bulletRadius;

}

Ship.prototype = {
  newOrientation: undefined,

  getCoolDown: function() {
    return this.coolDown;
  },
  resetCoolDown: function() {
    this.coolDown = this.defaultCoolDown;
  },
  setNewOrientation: function(newOrientation) {
    this.newOrientation = Common.normalize(newOrientation);
  },
  getNewOrientation: function() {
    return this.newOrientation;
  },
  update: function(timeElapsed) {
    this.turn(timeElapsed);
    var px = this.position[0], py = this.position[1];
    var ox = this.orientation[0], oy = this.orientation[1];
    var newx = px + ox * this.speed * timeElapsed, newy = py + oy * this.speed * timeElapsed;
    newx = Math.max(newx, this.radius);
    newx = Math.min(newx, WIDTH - this.radius);
    newy = Math.max(newy, this.radius + 50);
    newy = Math.min(newy, HEIGHT - this.radius);
    this.position = [newx, newy];
    this.coolDown = Math.max(this.coolDown - timeElapsed, 0);
  },
  turn: function(timeElapsed) {
    if(this.newOrientation === undefined) {
      // decrease speed
      this.speed = Math.max(this.speed - 0.5 * timeElapsed * this.maxSpeed, 0);
    } else if (Common.isSameOrientation(this.orientation, this.newOrientation)) {
      // increase speed
      this.speed = Math.min(this.speed + 100 * timeElapsed * this.maxSpeed, this.maxSpeed);
    } else {
      this.orientation = Common.normalize(this.newOrientation);
      this.speed *= 0.5;
    }
    this.newOrientation = undefined;
  },
  damage: function(damageValue) {
    if(!this.isAlive) {
      return;
    }
    this.hp -= damageValue;
    if(this.hp <= 0) {
      this.hp = 0;
      this.isAlive = false;
    }
      this.damagedTurns = 30;
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
  setPosition: function(pos) {
    this.position = Common.fixPosition(pos);
  },
  getHp: function() {
    return this.hp;
  },
  getRadius: function() {
    return this.radius;
  },
  restoreHp: function() {
    this.hp = this.fullHp;
  },
};

module.exports = Ship;
