var ship = require('./game/ship');
var bullet = require('./game/bullet');
var game = require('./game/game');
var common = require('./game/common');

var assert = require('assert');

var player = "Hai";


var timeInterval = 10;

var isSame = common.isSame;

function testShip() {

    var ship_a = new ship([0, 0], player);

    ship_a.turn(timeInterval, [1, 0]);
    
    assert(isSame(ship_a.getVelocity(), [0, 0]), "Speed should be 0 after turn");

    ship_a.update(timeInterval);

    assert(isSame(ship_a.getPosition(), [0, 0]), "Position should not change");

    ship_a.turn(timeInterval, [1, 0]);

    ship_a.update(timeInterval);

    assert(isSame(ship_a.getPosition(), [10, 0]), "The ship should move");

    ship_a.damage(10);

    assert(ship_a.getHp() == 90);

    ship_a.damage(100);

    assert(!ship_a.isAlive);
}

function testBullet() {
    var bullet_a = new bullet([0, 0], 5, [1, 0]);

    bullet_a.update(timeInterval);

    assert(isSame(bullet_a.getPosition(), [5, 0]));

    bullet_a.update(timeInterval);

    assert(isSame(bullet_a.getPosition(), [10, 0]));

    bullet_a.destroy();

    assert(!bullet_a.isAlive);
}

function testGame() {

    var game_a = new game();

    var ship_a = new ship([0, 0], player);
    var bullet_a = new bullet([10, 0]);
    var bullet_b = new bullet([0, 10]);
    var bullet_c = new bullet([0, 0]);
    var bullet_d = new bullet([0, 100]);

    game_a.addShip(ship_a);
    game_a.addBullet(bullet_a);
    game_a.addBullet(bullet_b);
    game_a.addBullet(bullet_c);
    game_a.addBullet(bullet_d);

    assert(game_a.isIntersect(ship_a, bullet_a));
    assert(game_a.isIntersect(ship_a, bullet_b));
    assert(game_a.isIntersect(ship_a, bullet_c));
    assert(!game_a.isIntersect(ship_a, bullet_d));

}

var test = function() {
    testShip();
    testBullet();
    testGame();
};

test();
