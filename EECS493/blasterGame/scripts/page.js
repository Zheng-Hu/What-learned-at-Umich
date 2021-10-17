// ==============================================
// ============ Page Scoped Globals Here ========
// ==============================================

// Global Window Handles (gwh_)
var gwh_gameWindow; 

// Global Object Handles 
var spaceship; 

// Counters


// Constants
var SPACESHIP_MOVEMENT = 50;   // px

var maxSpaceShipPosX; 
var maxSpaceShipPosY; 

// Position variables
var KEYS = {
  left: 37, 
  right: 39, 
  up: 38,
  down: 40,
  spacebar: 32,
  shift: 16
}


// ==============================================
// ============ Functional Code Here ============
// ==============================================

// Main Code
$(document).ready( function() {
  console.log("I'm ready!");

  gwh_gameWindow = $(".gameWindow"); 
  spaceship = $(".spaceship"); 

  $(window).keydown(keyPressRouter); 

  maxSpaceShipPosX = gwh_gameWindow.width() - spaceship.width(); 
  maxSpaceShipPosY = gwh_gameWindow.height() - spaceship.height(); 
  console.log("Max X is: " + maxSpaceShipPosX); 
  console.log("Max Y is: " + maxSpaceShipPosY); 


});


// which key was pressed?
function keyPressRouter(event) {
  switch(event.which) {
    case KEYS.up:
    case KEYS.down:
    case KEYS.left: 
    case KEYS.right:
      console.log("Arrow key pressed!");  
      moveSpaceShip(event.which); 
      break;
    case KEYS.spacebar:
      // fireRocket();
      break;
    case KEYS.shift: 
      // createAsteroid();
      break;
    default: 
      console.log("INVALID INPUT!!!!");       
      break;

  }
}

function moveSpaceShip(direction) {
  switch(direction) {
    case KEYS.left: 
      console.log("moving left"); 
      var newPos = parseInt(spaceship.css("left")) - SPACESHIP_MOVEMENT; 
      if (newPos < 0) {
        newPos = 0; 
      }
      spaceship.css("left", newPos); 
      break; 
    case KEYS.up: 
      console.log("moving up"); 
      var newPos = parseInt(spaceship.css("top")) - SPACESHIP_MOVEMENT;
      if (newPos < 0) {
        newPos = 0; 
      }
      spaceship.css("top", newPos); 
      break;
    case KEYS.down: 
      console.log("moving down"); 
      var newPos = parseInt(spaceship.css("top")) + SPACESHIP_MOVEMENT;
      if (newPos > maxSpaceShipPosY) {
        newPos = maxSpaceShipPosY; 
      }
      spaceship.css("top", newPos); 
      break;
    case KEYS.right: 
      console.log("moving right"); 
      var newPos = parseInt(spaceship.css("left")) + SPACESHIP_MOVEMENT; 
      if (newPos > maxSpaceShipPosX) {
        newPos = maxSpaceShipPosX 
      }
      spaceship.css("left", newPos); 
      break; 
  }
  
}

// Handle "fire" [rocket] events
function fireRocket() {
  console.log('Firing rocket...');
  // ADD CODE HERE TO MAKE ROCKETS AND FIRE THEM

}


// Handle asteroid creation events
function createAsteroid() {
  console.log('Spawning asteroid...');
  // ADD CODE HERE TO SPAWN ASTEROIDS
  
}


// Other functions
// Check if two objects are colliding
function isColliding(o1, o2) {
  // Define input direction mappings for easier referencing
  o1D = {
    'left': parseInt(o1.css('left')),
    'right': parseInt(o1.css('left')) + o1.width(),
    'top': parseInt(o1.css('top')),
    'bottom': parseInt(o1.css('top')) + o1.height()
  };

  o2D = {
    'left': parseInt(o2.css('left')),
    'right': parseInt(o2.css('left')) + o2.width(),
    'top': parseInt(o2.css('top')),
    'bottom': parseInt(o2.css('top')) + o2.height()
  };

  // If horizontally overlapping...
  if (
    (o1D.left < o2D.left && o1D.right > o2D.left) ||
    (o1D.left < o2D.right && o1D.right > o2D.right) ||
    (o1D.left < o2D.right && o1D.right > o2D.left)
  ) {

    if (
      (o1D.top > o2D.top && o1D.top < o2D.bottom) ||
      (o1D.top < o2D.top && o1D.top > o2D.bottom) ||
      (o1D.top > o2D.top && o1D.bottom < o2D.bottom)
    ) {

      // Collision!
      return true;
    }
  }
  return false;
}
