var ctx;
var my_ship;
var shipId;

now.ready(function() {
  console.log("ready");
})

var keys = [false, false, false, false, false];

$(document).ready(function() {
  $("body").css("background-color", "#003");
  var canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);


  $(window).keydown(function(key) {
    console.log(key.keyCode);
    if (key.keyCode == 38 || key.keyCode == 87) {
      keys[0] = true;
    }
    if (key.keyCode == 40 || key.keyCode == 83) {
      keys[1] = true;
    }
    if (key.keyCode == 37 || key.keyCode == 65) {
      keys[2] = true;
    }
    if (key.keyCode == 39 || key.keyCode == 68) {
      keys[3] = true;
    }
    if (key.keyCode == 32) {
      keys[4] = true;
    }
  });
  $(window).keyup(function(key) {
    if (key.keyCode == 38 || key.keyCode == 87) {
      keys[0] = false;
    }
    if (key.keyCode == 40 || key.keyCode == 83) {
      keys[1] = false;
    }
    if (key.keyCode == 37 || key.keyCode == 65) {
      keys[2] = false;
    }
    if (key.keyCode == 39 || key.keyCode == 68) {
      keys[3] = false;
    }
    if (key.keyCode == 32) {
      keys[4] = false;
    }
  })
  
  setInterval(function() {
    console.log(keys);
    if (keys[0]) {
      now.moveUp(shipId);
      console.log("client up");
    }
    if (keys[1]) {
      now.moveDown(shipId);
      console.log("client down");
    }
    if (keys[2]) {
      now.moveLeft(shipId);
      console.log("client left");
    }
    if (keys[3]) {
      now.moveRight(shipId);
      console.log("client right");
    }
    if (keys[4]) {
      now.fire(shipId, [window.mouseXPos - my_ship.position[0], window.mouseYPos - my_ship.position[1]]);
      console.log("fire");
    }
  },100);
  
  $(document).click(clicked);
  $(document).mousemove(function(e) {
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

function drawGun(ship) {
  ctx.fillStyle = '#000';
  var x = ship.position[0];
  var y = ship.position[1];
  var x2 = window.mouseXPos;
  var y2 = window.mouseYPos;


  var dx = x2 - x, dy = y2 - y;
  var norm = Math.sqrt(dx * dx + dy * dy);
  dx = dx / norm * ship.radius;
  dy = dy / norm * ship.radius;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + dx, y + dy);
  ctx.closePath();
  ctx.stroke();

}

function drawBG() {
  ctx.fillStyle = '#003';
  //black
  ctx.beginPath();
  ctx.rect(0, 0, 800, 600);
  ctx.closePath();
  ctx.fill();
}

function drawShip(ship, isSelf) {
  if (isSelf) {
      ctx.fillStyle = "#0F0";
  } else {
      ctx.fillStyle = '#F00';
  }
  ctx.beginPath();
  ctx.arc(ship.position[0], ship.position[1], ship.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function drawBullet(bullet) {
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.arc(bullet.position[0], bullet.position[1], bullet.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

}

now.OnConnect = function(id) {
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
    drawShip(ship, ship.id == shipId);
    if(ship.id == shipId) {
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
