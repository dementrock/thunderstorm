var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);


$(document).ready(function() {
  $(window).keydown(keyDown);
});
var keyDown = function(key) {
  if(key) {
    now.moveUp({});
  }
}
function drawBG() {
  ctx.fillStyle = '#000';
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

now.OnRender = function(gameState) {
  var game = JSON.parse(gameState);
  //game.ships
  //game.bullets

  drawBG();
  for(var shipIndex in game.ships) {
    var ship = this.ships[shipIndex];
    if(ship.isAlive) {
      drawShip(ship);
    }
  }

  for(var bulletIndex in game.bullets) {
    var bullet = game.bullets[bulletIndex];
    if(bullet.isAlive) {
      drawBullet(bullet);
    }
  }
}