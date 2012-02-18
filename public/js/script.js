$(document).ready(function(){
  $(window).keydown(keyDown);
});

var keyDown = function(key) {
  now.moveUp();
}
