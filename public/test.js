
var ctx;
$(document).ready(function(){
    var canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);

  $(window).keydown(keyDown);
   $(document).click(clicked)
   $(document).mousemove(function(e){
      window.mouseXPos = e.pageX;
      window.mouseYPos = e.pageY;

   }); 
; 

});



function drawBG() {
    ctx.fillStyle = '#000'; //black
    ctx.beginPath();
    ctx.rect(0, 0, 800, 600); 
    ctx.closePath();
    ctx.fill();
}


function drawShip(ship) {
    ctx.fillStyle = '#FFF'; //white
    ctx.beginPath();
    ctx.arc(ship.position[0], ship.position[1], ship.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
   

}

function drawBullet(bullet) {
    ctx.fillStyle = '#F00'; //red
    ctx.beginPath();
    ctx.arc(bullet.position[0], bullet.position[1], bullet.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    
}

function drawGun(ship) {
    ctx.fillStyle = '#FFF'; //white
    var x = ship.position[0];
    var y = ship.position[1];
    var x2 = window.mouseXPos;
    var y2 = window.mouseYPos;
    //alert(x2 + " " + y2);

    var dx = x2 - x, dy = y2 - y;
    var norm = Math.sqrt(dx*dx + dy*dy);
    dx = dx / norm * ship.radius;
    dy = dy / norm * ship.radius;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx, y + dy);
    ctx.closePath();
    ctx.stroke();
    
}


my_ship = {position:[500,100], radius:40, isAlive: true};

var speed = 5;
var clicked = function(mouse) {
    //e.pageX +', '+ e.pageY

}
var keyDown = function(key) {
    //alert("?");
    var code = key.keyCode;
    if (code == 38 || code == 87) { //up
        //alert("up!");
        my_ship.position[1] -= speed;
    }
    if (code == 40 || code == 83) { //down
        //alert("down!");
        my_ship.position[1] += speed;
    }
    if (code == 37 || code == 65) { //left
        //alert("left!");
        my_ship.position[0] -= speed;
    }
    if (code == 39 || code == 68) { //right
        //alert("right!");
        my_ship.position[0] += speed;
    }
}


game = {
    ships:[
        my_ship,
        {position:[50,50], radius:40, isAlive: true},
        {position:[100,100], radius:40, isAlive: true},
        {position:[150, 150], radius:40, isAlive: true}
    ],
    bullets:[
        {position:[50, 100], radius:10, isAlive: true},
        {position:[100,150], radius:10, isAlive: true},
        {position:[150,200], radius:10, isAlive: true}
    ]
};

// bad implementation
function sleep(milliSeconds){
	var startTime = new Date().getTime(); // get the current time
	while (new Date().getTime() < startTime + milliSeconds); // hog cpu
}


function loop() {
    drawBG();
    for (var shipIndex in game.ships) {
        var ship = game.ships[shipIndex];
        if (ship.isAlive) {
            drawShip(ship);
        }
    }
    drawGun(my_ship);

    for (var bulletIndex in game.bullets) {
        var bullet = game.bullets[bulletIndex];
        if (bullet.isAlive) {
            drawBullet(bullet);
        }
    }
}
    //setTimeOut(1);
    //}
    //sleep(1000);
    //alert("while loop");
setInterval(loop, 16);

