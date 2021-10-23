// ===================== Fall 2021 EECS 493 Assignment 2 =====================
// This starter code provides a structure and helper functions for implementing
// the game functionality. It is a suggestion meant to help you, and you are not
// required to use all parts of it. You can (and should) add additional functions
// as needed or change existing functions.

// ==============================================
// ============ Page Scoped Globals Here ========
// ==============================================

// Div Handlers
let game_window;

// Counters
var covidCometIdx = 1;
var vaccineIdx = 1;
var maskIdx = 1;

// Game Object Helpers
let COVID_SPEED = 20;
let AST_OBJECT_REFRESH_RATE = 15;
let maxPersonPosX = 1218;
let maxPersonPosY = 658;
let PERSON_SPEED = 10;                // Speed of the person
let vaccineOccurrence = 20000;       // Vaccine spawns every 20 seconds
let vaccineGone = 5000;              // Vaccine disappears in 5 seconds
let maskOccurrence = 15000;          // Masks spawn every 15 seconds
let maskGone = 5000;                 // Mask disappears in 5 seconds

// Movement Helpers
var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;
var touched = false;

// ==============================================
// ============ Functional Code Here ============
// ==============================================

// Main
$(document).ready(function () {
    // ====== Startup ====== 
    game_window = $('.game-window');
    actual_game = $('#actual_game');
    actual_game.hide();
    // setInterval(createCovidComets,1000);
    // createVaccine();
    // setInterval(createMask,3000);
    player = $("#player");
    vaccine = $(".vaccine");
    mask = $(".mask");
    setInterval(() => { mask.each(function() {console.log(1)})},100)
    $(window).keydown(keyPressRouter);
    
    
});

function judegeCollide (player,masks) {
  console.log(masks)
  if (isColliding(player,masks)){
    console.log("12312312312");
  }    
  

}

function keyPressRouter() {
  let curPlayerImg = $('#player_img');
  if (RIGHT) {
    let newPos = parseInt(player.css("left")) + PERSON_SPEED;
    if (newPos > maxPersonPosX) {
      newPos = maxPersonPosX;
    }
    player.css("left", newPos);
    curPlayerImg.attr("src", "./src/player/player_right.gif");
  }
  if (LEFT) {
    let newPos = parseInt(player.css("left")) - PERSON_SPEED;
    if (newPos < 0) {
      newPos = 0;
    }
    player.css("left", newPos);
    curPlayerImg.attr("src", "./src/player/player_left.gif");
  }
  if (DOWN) {

    let newPos = parseInt(player.css("top")) + PERSON_SPEED;
    if (newPos > maxPersonPosY) {
      newPos = maxPersonPosY;
    }
    player.css("top", newPos);
    curPlayerImg.attr("src", "./src/player/player_down.gif");}
  if (UP) {
    let newPos = parseInt(player.css("top")) - PERSON_SPEED;
    if (newPos < 0) {
      newPos = 0;
    }    
    player.css("top", newPos);
    curPlayerImg.attr("src", "./src/player/player_up.gif");
  }
}

// Keydown event handler
document.onkeydown = function(e) {
    // console.log(e) 
    if (e.key == 'ArrowLeft') LEFT = true;
    if (e.key == 'ArrowRight') RIGHT = true;
    if (e.key == 'ArrowUp') UP = true;
    if (e.key == 'ArrowDown') DOWN = true;
    
}

// Keyup event handler
document.onkeyup = function (e) {
    let curPlayerImg = $('#player_img');
    curPlayerImg.attr("src", "./src/player/player.gif");
    if (e.key == 'ArrowLeft') LEFT = false;
    if (e.key == 'ArrowRight') RIGHT = false;
    if (e.key == 'ArrowUp') UP = false;
    if (e.key == 'ArrowDown') DOWN = false;
}

function createCovidComets() {
  // console.log('Spawning Covid Comets...');
  let covidCometDivStr = "<div id='c-" + covidCometIdx + "' class = 'covidComet'> <img src ='src/covidstriod.png' /> </div>";
  
  // add to game window
  game_window.append(covidCometDivStr);

  let curCovidComet = $('#c-' + covidCometIdx);
  covidCometIdx ++;

  // curCovidComet.css("top", spaceship.css("top"));
  // var rocketPosX = parseInt(spaceship.css("left")) + (spaceship.width() / 2);
  // curCovidComet.css("left", rocketPosX);
  
  // Randomly spawn covid comets
  let side = parseInt(getRandomNumber(0,4));
  // console.log(side)
  if (side == 0) {
    curCovidComet.css({"top": 0, "left" : getRandomNumber(0,maxPersonPosX)});
    let speedY = getRandomNumber(0, COVID_SPEED);
    let speedX = Math.pow(COVID_SPEED**2 - speedY**2, 1/2)
    setInterval(function() {
      curCovidComet.css({"left": parseInt(curCovidComet.css("left")) + speedX, "top": parseInt(curCovidComet.css("top")) + speedY});
      if(parseInt(curCovidComet.css("left")) < 0 || parseInt(curCovidComet.css("right")) < 0 || parseInt(curCovidComet.css("bottom")) < 0) {
        curCovidComet.remove();
      }
    },100)
  }
  if (side == 1) {
    curCovidComet.css({"bottom": 0, "left" : getRandomNumber(0,maxPersonPosX)});
    let speedY = getRandomNumber(0, COVID_SPEED);
    let speedX = Math.pow(COVID_SPEED**2 - speedY**2, 1/2)
    setInterval(function() {
      curCovidComet.css({"left": parseInt(curCovidComet.css("left")) + speedX, "top": parseInt(curCovidComet.css("top")) - speedY});
      if(parseInt(curCovidComet.css("left")) < 0 || parseInt(curCovidComet.css("right")) < 0 || parseInt(curCovidComet.css("top")) < 0) {
        curCovidComet.remove();
      }
    },100)
  }
  if (side == 2) {
    curCovidComet.css({"left": 0, "top" : getRandomNumber(0,maxPersonPosY)});
    let speedX = getRandomNumber(0, COVID_SPEED);
    let speedY = Math.pow(COVID_SPEED**2 - speedX**2, 1/2)
    setInterval(function() {
      curCovidComet.css({"left": parseInt(curCovidComet.css("left")) + speedX, "top": parseInt(curCovidComet.css("top")) + speedY});
      if(parseInt(curCovidComet.css("right")) < 0 || parseInt(curCovidComet.css("top")) < 0 || parseInt(curCovidComet.css("bottom")) < 0) {
        curCovidComet.remove();
      }
    },100)
  }
  if (side == 3) {
    curCovidComet.css({"right": 0, "top" : getRandomNumber(0,maxPersonPosY)});
    let speedX = getRandomNumber(0, COVID_SPEED);
    let speedY = Math.pow(COVID_SPEED**2 - speedX**2, 1/2)
    setInterval(function() {
      curCovidComet.css({"left": parseInt(curCovidComet.css("left")) - speedX, "top": parseInt(curCovidComet.css("top")) + speedY});
      if(parseInt(curCovidComet.css("left")) < 0 || parseInt(curCovidComet.css("top")) < 0 || parseInt(curCovidComet.css("bottom")) < 0 ) {
        curCovidComet.remove();
      }
    },100)
  }

}

function createVaccine() {
  // console.log('Spawning Vaccine');
  let vaccineDivStr = "<div id='v-" + vaccineIdx + "' class = 'vaccine'> <img src ='src/vacc.gif' /> </div>";
  game_window.append(vaccineDivStr);

  // Set vaccine randomly in the window
  let curVaccine = $('#v-' + vaccineIdx);
  vaccineIdx++;
  curVaccine.css({"right": getRandomNumber(0,maxPersonPosX), "top" : getRandomNumber(0,maxPersonPosY)});

  // Remove the vaccine
  setTimeout(function() {
    curVaccine.remove();
  },vaccineGone)
}

function createMask() {
  // console.log('Spawning Mask');
  let maskDivStr = "<div id='m-" + maskIdx + "' class = 'mask'> <img src ='src/mask.gif' /> </div>";
  game_window.append(maskDivStr);

  // Set mask randomly in the window
  let curMask = $('#m-' + maskIdx);
  maskIdx++;
  curMask.css({"right": getRandomNumber(0,maxPersonPosX), "top" : getRandomNumber(0,maxPersonPosY)});
  
  // Remove the mask
  setTimeout(function() {
    curMask.remove();
  },100000)
}


//===================================================

// ==============================================
// =========== Utility Functions Here ===========
// ==============================================

// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange){
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange){
  const o1D = { 'left': o1.offset().left + o1_xChange,
        'right': o1.offset().left + o1.width() + o1_xChange,
        'top': o1.offset().top + o1_yChange,
        'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = { 'left': o2.offset().left,
        'right': o2.offset().left + o2.width(),
        'top': o2.offset().top,
        'bottom': o2.offset().top + o2.height()
  }; 
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
     // collision detected!
     return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max){
  return (Math.random() * (max - min)) + min;
}
