var ctx;
var my_ship;
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
  if(key == 38 || key == 87) {//up
    now.moveUp({});
  } else if(key == 40 || key == 83) {//down
    now.moveDown({});
  } else if(key == 37 || key == 65) {//left
    now.moveLeft({});
  } else if(key == 39 || key == 68) {//right
    now.moveRight({});
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
