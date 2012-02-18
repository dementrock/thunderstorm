$(document).ready(function(){
  $(window).keydown(keyDown);
});

var keyDown = function(key) {
  now.moveUp({});
}

now.OnRender = function (gameState) {
  var game = JSON.parse(gameState);
  //game.ships
  //game.bullets
}
