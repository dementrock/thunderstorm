var common = require('./common');

function Game() {
    this.ships = new Array();
    this.bullets = new Array();
}

Game.prototype = {
    update:
    function(timeElasped) {
        // update direction of ships?
        // TODO

        // update all ships
        for (var shipIndex in this.ships) {
            var ship = this.ships[shipIndex];
            if (ship.isAlive) {
                ship.update(timeElapsed);
            }
        }
        // update all bullets
        for (var bulletIndex in this.bullets) {
            var bullet = this.bullets[bulletIndex];
            if (bullet.isAlive) {
                bullet.update(timeElasped);
            }
        }
        // test for intersection
        for (var bulletIndex in this.bullets) {
            // Put bullet on the out loop because it's possible for one bullet to hit multiple ships
            var bullet = this.bullets[bulletIndex];
            var isHit = false;
            for (var shipIndex in this.ships) {
                var ship = this.ships[shipIndex];
                if (this.isIntersect(ship, bullet)) {
                    ship.damage(bullet.damageValue);
                    isHit = true;
                }
            }
            if (isHit) {
                bullet.isAlive = false;
            }
        }
        // broadcast back to clients
        // TODO
    },

    isIntersect:
    function(obj1, obj2) {
        return common.distance(obj1.getPosition(), obj2.getPosition()) <= obj1.getRadius() + obj2.getRadius(); 
        exports.distance = distance;
    },

    addShip:
    function(newShip) {
        this.ships.push(newShip);
    },

    addBullet:
    function(newBullet) {
        this.bullets.push(newBullet);
    },

};

module.exports = Game;
