var ctx;
var my_ship;
var shipId;

now.ready(function() {
})

$(document).ready(function() {
  var canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);

  $(window).keydown(keyDown);
});
var keyDown = function(key) {
    //alert("?");
    var code = key.keyCode;
    if (code == 38 || code == 87) { //up
        now.moveUp(shipId);
        console.log("client up");

    }
    if (code == 40 || code == 83) { //down
        now.moveDown(shipId);
        console.log("client down");

    }
    if (code == 37 || code == 65) { //left
        now.moveLeft(shipId);
        console.log("client left");

    }
    if (code == 39 || code == 68) { //right
        now.moveRight(shipId);
        console.log("client right");

    }
}

function drawBG() {
  ctx.fillStyle = '#777';
  //black
  ctx.beginPath();
  ctx.rect(0, 0, 800, 600);
  ctx.closePath();
  ctx.fill();
}

function drawShip(ship) {
  ctx.fillStyle = '#FFF';
  //white
  ctx.beginPath();
  ctx.arc(ship.position[0], ship.position[1], ship.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function drawBullet(bullet) {
  ctx.fillStyle = '#F00';
  ctx.beginPath();
  ctx.arc(bullet.position[0], bullet.position[1], bullet.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

}

now.OnConnect = function (id) {
    //my_ship = JSON.parse(_ship);
    shipId = id;
    //alert(id);
}

now.OnRender = function(_ships, _bullets) {
  var ships = JSON.parse(_ships);
  var bullets = JSON.parse(_bullets);

  drawBG();
  for(var shipIndex in ships) {
    var ship = ships[shipIndex];
    if(ship.isAlive) {
      drawShip(ship);
    }
  }

  for(var bulletIndex in bullets) {
    var bullet = bullets[bulletIndex];
    if(bullet.isAlive) {
      drawBullet(bullet);
    }
  }
}
