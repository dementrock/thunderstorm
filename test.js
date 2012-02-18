var ship = require('./game/ship');
var bullet = require('./game/bullet');
var game = require('./game/game');
var common = require('./game/common');

var assert = requrie('assert');

var player = "Hai";


var timeInterval = 10;

var isSame = common.isSame;

function testShip() {
    var ship_a = new ship([0, 0], player);

    ship_a.turn(timeInterval, [1, 1]);
    
    assert(isSame(ship_a.getVelocity(), [0, 0]), "Speed should be 0 after turn");
    console.log(ship_a.getVelocity());

    ship_a.update(timeInterval);

    console.log(ship_a.getPosition());

    ship_a.turn(timeInterval, [1, 1]);
    ship_a.update(timeInterval);

    console.log(ship_a.getPosition());

    ship_a.damage(10);

    console.log(ship_a.getHp());

    ship_a.damage(100);

    console.log(ship_a.getHp());
