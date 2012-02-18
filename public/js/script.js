var ctx;
var my_ship;
var shipId;
var last_fired;

var image = new Image();
//image.src = "https://d3qcduphvv2yxi.cloudfront.net/assets/562827/view_large/da56bf7994f519028539ddf52ddbacf9.jpg?1277067092";
//image.onload = function() {
    //ctx.fillStyle = ctx.createPattern(image, "repeat");
    //context.fillRect(0, 0, WIDTH, HEIGHT);
//}

var WIDTH = 1280;
var HEIGHT = 700;
var COOLDOWN = 400;

now.ready(function() {
  console.log("ready");
})

var keys = [false, false, false, false, false];

$(document).ready(function() {
  $("body").css("background-color", "#003");
  var canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  document.body.appendChild(canvas);


  $(window).keydown(function(key) {
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
    if (keys[0]) {
      now.moveUp(shipId);
    }
    if (keys[1]) {
      now.moveDown(shipId);
    }
    if (keys[2]) {
      now.moveLeft(shipId);
    }
    if (keys[3]) {
      now.moveRight(shipId);
    }
    if (keys[4]) {
      now.fire(shipId, [window.mouseXPos - my_ship.position[0], window.mouseYPos - my_ship.position[1]]);
    }
  },100);
  
  $(document).click(clicked);
  $(document).mousemove(function(e) {
    window.mouseXPos = e.pageX;
    window.mouseYPos = e.pageY;

  });
});

var clicked = function(e) {
    time = new Date().getTime();
    if (!last_fired || time - last_fired >= COOLDOWN) {
        console.log('fire');
        last_fired = time;
        // console.log('fire! with ');
        // console.log(my_ship);
        var x = e.pageX;
        var y = e.pageY;
        //  console.log('to ' + x + ', ' + y);
        //console.log('fire');
        
        now.fire(shipId, [x - my_ship.position[0], y - my_ship.position[1]]);
    }    
}

function drawGun(ship) {
    ctx.strokeStyle = '#F0F';
    var oldWidth = ctx.lineWidth;
    ctx.lineWidth = 4;
    var x = ship.position[0];
    var y = ship.position[1];
    var x2 = window.mouseXPos;
    var y2 = window.mouseYPos;


    var dx = x2 - x, dy = y2 - y;
    var norm = Math.sqrt(dx * dx + dy * dy);
    dx = dx / norm * 2 * ship.radius;
    dy = dy / norm * 2 * ship.radius;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx, y + dy);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = oldWidth;
}

function drawBG() {
  ctx.fillStyle = '#003';
  //black
  ctx.beginPath();
  ctx.rect(0, 0, WIDTH, HEIGHT);
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
  for (var start_y = ship.position[1] - ship.radius - 10, restHp = ship.hp, nowHp = Math.min(100, restHp); restHp > 0; start_y -= 10, restHp -= 100, nowHp = Math.min(100, restHp)) { 
    ctx.fillRect(ship.position[0] - ship.radius, start_y, 2.0 * ship.radius * nowHp / 100, 5);
  }
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
    var found = false;
  var ships = JSON.parse(_ships);
  var bullets = JSON.parse(_bullets);
  drawBG();
  for(var shipIndex in ships) {
    var ship = ships[shipIndex];
    drawShip(ship, ship.id == shipId);
    if(ship.id == shipId) {
      my_ship = ship;
        found = true;
    }
  }
    if (!found) {
        return;
    }
  drawGun(my_ship);

  for(var bulletIndex in bullets) {
    var bullet = bullets[bulletIndex];
    if(bullet.isAlive) {
      drawBullet(bullet);
    }
  }
}
