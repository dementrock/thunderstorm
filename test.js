var Ship = require('./game/ship');
var Bullet = require('./game/bullet');
var Game = require('./game/game');
var Common = require('./game/Common');

var assert = require('assert');

var player = "Hai";


var timeInterval = 10;

var isSame = Common.isSame;

function testShip() {

    var ship_a = new Ship([0, 0], player);

    ship_a.setNewOrientation([1, 0]);
    
    assert(isSame(ship_a.getVelocity(), [0, 0]), "Speed should be 0 after turn");

    ship_a.update(timeInterval);

    assert(isSame(ship_a.getPosition(), [0, 0]), "Position should not change");

    ship_a.setNewOrientation([1, 0]);

    ship_a.update(timeInterval);

    assert(isSame(ship_a.getPosition(), [50, 0]), ship_a.getPosition());

    ship_a.damage(10);

    assert(ship_a.getHp() == 90);

    ship_a.damage(100);

    assert(!ship_a.isAlive);
}

function testBullet() {
    var bullet_a = new Bullet([0, 0], 5, [1, 0]);

    bullet_a.update(timeInterval);

    assert(isSame(bullet_a.getPosition(), [50, 0]));

    bullet_a.update(timeInterval);

    assert(isSame(bullet_a.getPosition(), [100, 0]));

    bullet_a.destroy();

    assert(!bullet_a.isAlive);
}

function testGame() {

    var game_a = new Game();

    var ship_a = new Ship([0, 0], player);
    var bullet_a = new Bullet([10, 0], 1, [10, 0]);
    var bullet_b = new Bullet([0, 10], 1, [0, -1]);
    var bullet_c = new Bullet([0, 0], 100, [1, 0]);
    var bullet_d = new Bullet([0, 100], 100, [0, -1]);

    game_a.addShip(ship_a);
    game_a.addBullet(bullet_a);
    game_a.addBullet(bullet_b);
    game_a.addBullet(bullet_c);
    game_a.addBullet(bullet_d);

    assert(game_a.isIntersect(ship_a, bullet_a));
    assert(game_a.isIntersect(ship_a, bullet_b));
    assert(game_a.isIntersect(ship_a, bullet_c));
    assert(!game_a.isIntersect(ship_a, bullet_d));

    game_a.update(1);

    assert(Common.isSame(game_a.ships[0].getPosition(), [0, 0]), game_a.ships[0].getPosition());
    assert(Common.isSame(game_a.bullets[0].getPosition(), [11, 0]));
    assert(Common.isSame(game_a.bullets[1].getPosition(), [0, 9]));
    assert(Common.isSame(game_a.bullets[2].getPosition(), [100, 0]));
    assert(Common.isSame(game_a.bullets[3].getPosition(), [0, 0]));
    assert(!game_a.bullets[3].isAlive);

    game_a.fire(game_a.ships[0], [0, 1]);
    console.log(game_a.bullets[4].getPosition());

}

var test = function() {
    testShip();
    testBullet();
    testGame();
};

test();
