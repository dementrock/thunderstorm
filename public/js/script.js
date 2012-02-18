var ctx;
var my_ship;
var shipId;
var last_fired;

var old_ships = null;
var new_ships = null;
var WIDTH = 1280;
var HEIGHT = 700;
var COOLDOWN = 400;
var bg_color = '#0099cc';
var interp = null;
var ininterp = null;
var isDead = false;

var count = 0;

now.ready(function() {
  //console.log("ready");
})

var keys = [false, false, false, false, false];

$(document).ready(function() {
  $("body").css("background-color", "#3366ff");
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
    if (keys[4]) {
      now.fire(shipId, [window.mouseXPos - my_ship.position[0], window.mouseYPos - my_ship.position[1]]);
    }

    if (keys[0] && keys[2] ) {
      now.moveUpLeft(shipId);
    }
    else if (keys[0] && keys[3] ) {
      now.moveUpRight(shipId);
    }
    else if (keys[1] && keys[2] ) {
      now.moveDownLeft(shipId);
    }
    else if (keys[1] && keys[3] ) {
      now.moveDownRight(shipId);
    }

    else if (keys[0]) {
      now.moveUp(shipId);
    }
    else if (keys[1]) {
      now.moveDown(shipId);
    }
    else if (keys[2]) {
      now.moveLeft(shipId);
    }
    else if (keys[3]) {
      now.moveRight(shipId);
    }
  },100);
  
  $(document).click(clicked);

  $(document).mousemove(function(e) {
    if(WIDTH > window.innerWidth) {
      window.mouseXPos = e.pageX;
    } else {
      window.mouseXPos = e.pageX - (window.innerWidth - WIDTH) / 2;
    }
    window.mouseYPos = e.pageY;

  });
  
  now.receiveChat = function(message) {
    console.log(msg);
    //bubbleChat(msg);
  };

  $("#send").click(function() {
    now.sendChat($("#chatBox").val());
    $("#chatBox").val("");
  });
});

var clicked = function(e) {
        if (WIDTH > window.innerWidth) {
          var x = e.pageX;
        } else {
          var x = e.pageX - (window.innerWidth - WIDTH) / 2;
        }
        var y = e.pageY;
        now.fire(shipId, [x - my_ship.position[0], y - my_ship.position[1]]);
}

function drawMyGun() {
    var ship = my_ship;
    //console.log('drawing my gun ' + ship);
    ctx.strokeStyle = '#CC9900';
    var oldWidth = ctx.lineWidth;
    ctx.lineWidth = ship.bulletRadius * 2;
    var x = ship.position[0];
    var y = ship.position[1];
    var x2 = window.mouseXPos;
    var y2 = window.mouseYPos;
//    console.log(x + " " + y + " " + x2 + " " + y2);

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


/*        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x+dx, y+dy, ctx.lineWidth / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = oldWidth;
    */
}
function drawGun(x, y, vector, size, width) {
    ctx.strokeStyle = '#F0F';
    var oldWidth = ctx.lineWidth;
    ctx.lineWidth = width;
   // var x = ship.position[0];
    //var y = ship.position[1];
    //var x2 = window.mouseXPos;
    //var y2 = window.mouseYPos;

    var dx = vector[0], dy = vector[1];//x2 - x, dy = y2 - y;
    var norm = Math.sqrt(dx * dx + dy * dy);
    dx = dx / norm * size;
    dy = dy / norm * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx, y + dy);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = oldWidth;
}

function drawBG() {
  ctx.fillStyle = bg_color;
  //black
  ctx.beginPath();
  ctx.rect(0, 0, WIDTH, HEIGHT);
  ctx.closePath();
  ctx.fill();
}

function drawPowerup(powerup) {
    ctx.fillStyle = '#FC0';
    ctx.beginPath();
    var cx = powerup.position[0], cy = powerup.position[1];
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(count / 3);
    /*
    ctx.fillRect(-powerup.radius, -powerup.radius, 2 * powerup.radius, 2 * powerup.radius);
    */

    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#FC0";
    ctx.beginPath();
    ctx.moveTo(0, powerup.radius);

    for (var n = 0; n < 10; n++) {
        var radius = (n % 2 === 0 ? powerup.radius : powerup.radius * 0.5) * 2;
        var x = radius * Math.sin(n * 2 * Math.PI / 10);
        var y = radius * Math.cos(n * 2 * Math.PI / 10);
        ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
function drawShip(ship, isSelf) {
  if (ship.blink) {
      ctx.fillStyle = "#999";
    }else if (isSelf) {
      ctx.fillStyle = "#0F0";
  } else {
      ctx.fillStyle = '#990000';
  }
    
  ctx.beginPath();
  ctx.arc(ship.position[0], ship.position[1], ship.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  ctx.fillRect(ship.position[0] - ship.radius, ship.position[1] - ship.radius - 10, 2.0 * ship.radius * ship.hp / ship.fullHp, 5);
}

function drawBullet(bullet) {
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.arc(bullet.position[0], bullet.position[1], bullet.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

}

   
function drawExplosion(explosion){
    ctx.fillStyle = '#FF6600';
    ctx.beginPath();
    ctx.arc(explosion.position[0], explosion.position[1], explosion.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#FF3300';
    ctx.beginPath();
    ctx.arc(explosion.position[0], explosion.position[1], explosion.radius - 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

now.OnConnect = function(id) {
    shipId = id;
    
};


drawText = function(str) {
    var x = WIDTH / 2;
    var y = HEIGHT / 2;
    ctx.font = "30pt Calibri";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(str, x, y);

};

var TIMES = 25;
var TIME = 40;

now.OnRender = function(ships, bullets, explosions, powerups) {

    ++count;
    drawBG();
    
    var found = false;
    for(var shipIndex in ships){
        var ship = ships[shipIndex];
        drawShip(ship, ship.id == shipId);
        if(ship.id == shipId) {
            my_ship = ship;
            found = true;
        }
    }
    if (!found) {
        drawText("You are dead! Refresh the page to revenge!");
        return;
    }

    drawMyGun();
    for (var shipIndex in ships) {
        var ship = ships[shipIndex];
        if (ship.id == shipId) {
            continue;
        }
        if (ship.fireOrientation != null ) {
            drawGun(ship.position[0], ship.position[1], ship.fireOrientation, ship.radius * 2, ship.bulletRadius * 2);
        }
    }


    for(var exploIndex in explosions) {
         drawExplosion(explosions[exploIndex]);
    }

    for(var bulletIndex in bullets) {
        var bullet = bullets[bulletIndex];
        if(bullet.isAlive) {
            drawBullet(bullet);
        }
    }
    for (var powerupIndex in powerups) {
        var powerup = powerups[powerupIndex];
        if (powerup.isAlive) {
            drawPowerup(powerup);
        }
    }
    if (my_ship.hp <= 0) {
        isDead = true;
    }
    
}
