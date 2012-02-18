var Common = require('./Common');
var Ship = require('./ship');
var Bullet = require('./bullet');

function Game() {
    this.ships = new Array();
    this.bullets = new Array();
}

Game.prototype = {
    update:
    function(timeElapsed) {
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
                bullet.update(timeElapsed);
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
        return Common.distance(obj1.getPosition(), obj2.getPosition()) <= obj1.getRadius() + obj2.getRadius(); 
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

    fire:
    function(ship, gunOrientation) {
        if (Common.isEqual(ship.getCoolDown(), 0)) {
            gunOrientation = Common.normalize(gunOrientation);
            var shipPos = ship.getPosition();
            console.log(gunOrientation);
            console.log(Bullet.rawSpeed);
            var bulletVelocity = [gunOrientation[0] * Bullet.rawSpeed, gunOrientation[1] * Bullet.rawSpeed];
            var bulletSpeed = Common.norm(bulletVelocity);
            var bulletOrientation = Common.normalize(bulletVelocity);
            var bulletPosition = [shipPos[0] + ship.radius * 2 * bulletOrientation[0], shipPos[1] + ship.radius * 2 * bulletOrientation[1]];
            console.log(bulletPosition);
            this.addBullet(new Bullet(bulletPosition, bulletSpeed, bulletOrientation));
            ship.resetCoolDown();
        }
    },

};

module.exports = Game;
