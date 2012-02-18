var ctx;
var my_ship;
var shipId;

now.ready(function() {
  console.log("ready");
})

$(document).ready(function() {
  var canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);

  $(window).keydown(keyDown);
    $(document).click(clicked);
   $(document).mousemove(function(e){
      window.mouseXPos = e.pageX;
      window.mouseYPos = e.pageY;

   });
});

var clicked = function(e) {
    console.log('fire! with ');
    console.log(my_ship);
    var x = e.pageX;
    var y = e.pageY;
    console.log('to ' + x + ', ' + y);
    now.fire(shipId, [x - my_ship.position[0], y - my_ship.position[1]]);
}
  
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

function drawGun(ship) {
 //   console.log('calling gun with ')
 //   console.log(ship.id);
    ctx.fillStyle = '#000'; //white
    var x = ship.position[0];
    var y = ship.position[1];
    var x2 = window.mouseXPos;
    var y2 = window.mouseYPos;
    //alert(x2 + " " + y2);
    

    var dx = x2 - x, dy = y2 - y;
    var norm = Math.sqrt(dx*dx + dy*dy);
    dx = dx / norm * ship.radius;
    dy = dy / norm * ship.radius;
//    console.log('from ' + x + ', ' + y);
//    console.log('mouse ' + x2 + ', ' + y2);
//    console.log('to ' + (x+dx) + ', ' + (y+dy));
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx, y + dy);
    ctx.closePath();
    ctx.stroke();
    
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
      if (ship.id == shipId) {
          my_ship = ship;
     //     console.log('found my ship!');
      }
  }

    drawGun(my_ship);

  for(var bulletIndex in bullets) {
    var bullet = bullets[bulletIndex];
    if(bullet.isAlive) {
      drawBullet(bullet);
    }
  }
}
