var ctx;
var my_ship;
var shipId;
var last_fired;

var old_ships = null;
var new_ships = null;
var WIDTH = 1280;
var HEIGHT = 700;
var COOLDOWN = 400;
var bg_color = '#09F';
var interp = null;
var ininterp = null;
var isDead = false;

now.ready(function() {
  //console.log("ready");
})

var keys = [false, false, false, false, false];

$(document).ready(function() {
  $("body").css("background-color", "#000");
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
    if(WIDTH > window.innerWidth) {
      window.mouseXPos = e.pageX;
    } else {
      window.mouseXPos = e.pageX - (window.innerWidth - WIDTH) / 2;
    }
    window.mouseYPos = e.pageY;


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
    console.log(powerup.position);
    ctx.arc(powerup.position[0], powerup.position[1], powerup.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
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

   
function drawExplosion(explosion){
    console.log("drawing explosion");
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(explosion.position[0], explosion.position[1], explosion.radius, 0, Math.PI * 2, true);
    explosion.radius--;
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
    //console.log("rendering");
    if (ininterp) {
        clearTimeout(ininterp);
        ininterp = null;
    }
    old_ships = new_ships;
    new_ships = ships;
    if (!old_ships) {
        return;
    }

    

    interp = function( count ){
        drawBG();
        if (isDead) {
            drawText("You are dead! Refresh the page to revenge!");
            return;
        }
        var found = false;
        for(var shipIndex in new_ships){
            var ship = new_ships[shipIndex];
            /*
            var old_ship = old_ships[shipIndex];
            var pos = ship.position, old_pos = old_ship.position;
            var direction = [pos[0] - old_pos[0], pos[1] - old_pos[1]];
            var newx = ship.position[0] + 1.0 * direction[0]/TIMES,
            newy = ship.position[1] + 1.0 * direction[1]/TIMES;
            newx = Math.max(ship.radius, newx);
            newx = Math.min(WIDTH - ship.radius, newx);
            newy = Math.max(ship.radius, newy);
            newy = Math.min(HEIGHT- ship.radius, newy);
            ship.position = [newx, newy];*/
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
                //console.log('myself!');
                continue;
            }
            //console.log(ship.fireOrientation);
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
        if (count > 0){
            ininterp = function(){ 
                if (interp) {
                    interp(count-1); 
                }
            }
            setTimeout(ininterp, TIME ); //?
        } else {
            interp = null;
        }
    };
    
    interp(TIMES);
}

