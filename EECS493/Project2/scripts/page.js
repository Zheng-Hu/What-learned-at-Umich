// ===================== Fall 2021 EECS 493 Assignment 2 =====================
// This starter code provides a structure and helper functions for implementing
// the game functionality. It is a suggestion meant to help you, and you are not
// required to use all parts of it. You can (and should) add additional functions
// as needed or change existing functions.

// ==============================================
// ============ Page Scoped Globals Here ========
// ==============================================

// Div Handlers


var volume = 50;
var covid_danger_num_init = 20;
var firstGame = true;

// ==============================================
// ============ Functional Code Here ============
// ==============================================

// Main
$(document).ready(function () {
    // ====== Startup ====== 
  
    window.game_window = $('.game-window');
    window.curPlayerImg = $('#player_img');
    window.score_num = $('#score_num');
    window.covid_danger_num = $('#covid_danger_num');
    window.covid_level = $('#covid_level');
    window.game_over_score = $('#game-over-score');

    // button used in game
    window.play_button = $('#play-button');
    window.setting_button = $('#setting-button');
    window.close_button = $('#close-button');
    window.start_button = $('#start-button');
    window.start_over_button = $('#start-over-button');

    window.tutorial = $('#Tutorial');
    window.settings = $('#Settings');
    window.main_menu = $('#main-menu');
    window.actual_game = $('#actual_game');
    window.get_ready_splash_screen = $('#get_ready_splash_screen');
    window.game_over_page = $('#game-over-page');
    
    $(window).keydown(keyPressRouter);
    $(window).keyup(keyUpRouter);

    window.volume_bar = $('.slider');
    window.volume_text = $('#volume');
    window.setting_easy_button = $('#setting-easy-button');
    window.setting_normal_button = $('#setting-normal-button');
    window.setting_hard_button = $('#setting-hard-button');

    window.covidSpawn = 800;
    window.COVID_SPEED = 30;
    window.gameover = false;

    setting_normal_button.css("border","solid 5px yellow");
    
    setting_button.on("click",function(){
      settings.show();
      window.volumeInterval = setInterval(()=>{
        volume = volume_bar.val();
        volume_text.html(volume);
      },20) 
    });

    close_button.on("click",function(){
      settings.hide();
      clearInterval(volumeInterval);
    });
    

    setting_easy_button.on("click",()=>{
      covidSpawn = 1000;
      COVID_SPEED = 10;
      covid_danger_num_init = 10;
      setting_easy_button.css("border","solid 5px yellow");
      setting_normal_button.css("border","solid 5px transparent");
      setting_hard_button.css("border","solid 5px transparent");
    });

    setting_normal_button.on("click",()=>{
      covidSpawn = 800;
      COVID_SPEED = 30;
      covid_danger_num_init = 20;
      setting_normal_button.css("border","solid 5px yellow");
      setting_hard_button.css("border","solid 5px transparent");
      setting_easy_button.css("border","solid 5px transparent");
    });

    setting_hard_button.on("click",()=>{
      covidSpawn = 600;
      COVID_SPEED = 50;
      covid_danger_num_init = 30;
      setting_hard_button.css("border","solid 5px yellow");
      setting_normal_button.css("border","solid 5px transparent");
      setting_easy_button.css("border","solid 5px transparent");
    })

    play_button.on("click",function(){
      if(firstGame){
        tutorial.show(); 
        main_menu.hide(); 
      } else{
        actual_game.show();
        get_ready_splash_screen.show(); 
        main_menu.hide();
        covid_danger_num_str = covid_danger_num_init;
        covid_danger_num.html(covid_danger_num_str);

        setTimeout(()=>{
          get_ready_splash_screen.hide();
          curPlayerImg.attr("src", "./src/player/player.gif");
          executeGame();
        },3000);
      }
    });
    start_button.on("click",()=>{
      actual_game.show(); 
      tutorial.hide();
      covid_danger_num_str = covid_danger_num_init;
      covid_danger_num.html(covid_danger_num_str);
      setTimeout(()=>{
        get_ready_splash_screen.hide();
        curPlayerImg.attr("src", "./src/player/player.gif");
        executeGame();
      },3000)
    });

    start_over_button.on("click",()=>{

      main_menu.show();
      game_over_page.hide();
      
      actual_game.hide();
      play_button.show();
      setting_button.show();

    
      window.score = 0;
      window.level = 1;
      window.covid_danger_num_str = covid_danger_num_init;
      window.covid_level_str = 1;
      covid_danger_num.html(covid_danger_num_str);
      covid_level.html(covid_level_str);
      score_num.html(score);

      player_img = "<img id = 'player_img'></img>";
      player = "<div id = 'player'></div>";
      actual_game.append(player);
      player = $("#player");
      player.append(player_img);
      curPlayerImg = $('#player_img');

      firstGame = false;

      // setTimeout(()=>{
      //   get_ready_splash_screen.hide();
      //   curPlayerImg.attr("src", "./src/player/player.gif");
      //   executeGame();
      // },3000) 
    });



    // setInterval(() => {
    //   $(window).keydown(()=>{keypress=true})
    //   if(!keypress){
    //     if(!maskOn){
    //       curPlayerImg.data("src", "./src/player/player.gif");
    //     } else {
    //       curPlayerImg.data("src", "./src/player/player_masked.gif");
    //     }
    //   }
    // },1);

});

function executeGame () {
  window.score = 0;
  window.level = 1;
  window.covid_danger_num_str = covid_danger_num_init;
  window.covid_level_str = 1;
  window.intervalArray = [];
  // Counters
  window.covidCometIdx = 1;
  window.vaccineIdx = 1;
  window.maskIdx = 1;

  window.maskProtect = false;

  // Game Object Helpers
  window.AST_OBJECT_REFRESH_RATE = 15;
  window.maxPersonPosX = 1218;
  window.maxPersonPosY = 658;
  window.PERSON_SPEED = 20;                // Speed of the person
  window.vaccineOccurrence = 20000;       // Vaccine spawns every 20 seconds
  window.vaccineGone = 5000;              // Vaccine disappears in 5 seconds
  window.maskOccurrence = 15000;          // Masks spawn every 15 seconds
  window.maskGone = 5000;                 // Mask disappears in 5 seconds

  // Movement Helpers
  window.LEFT = false;
  window.RIGHT = false;
  window.UP = false;
  window.DOWN = false;
  window.touched = false;



  window.maskOn = false;
  window.startgame = false;

  gameover = false;

  covid_danger_num.html(covid_danger_num_str);
  covid_level.html(covid_level_str);
  score_num.html(score);



  intervalArray.push(createMaskInterval = setInterval(createMask,maskOccurrence));;
  intervalArray.push(createVaccineInterval = setInterval(createVaccine,vaccineOccurrence));
  intervalArray.push(createCometInterval = setInterval(createCovidComets,covidSpawn));
  intervalArray.push(judgeCollideInterval = setInterval(() =>{
    mask = $(".mask");
    player = $("#player");
    vaccine = $(".vaccine");
    covidComet = $(".covidComet");
    judegeCollide(player,mask,vaccine,covidComet)
  },1));

  intervalArray.push(scoreNumInterval = setInterval(()=>{
    score += 40;
    score_num.html(score);
  },500));
  

}


function judegeCollide (player,masks,vaccines,covidComets) {
  masks.each(function(){
    if (isColliding(player,$(this)) && !maskOn){
      maskOn = true;
      curPlayerImg.attr("src", "./src/player/player_masked.gif");
      var audio = new Audio('./src/audio/collect.mp3');
      audio.volume = volume/100;
      audio.load();
      audio.play();
      setTimeout(() => {audio.pause(); audio.currentTime=0;},1000);
      $(this).remove();
    }    
  });
  covidComets.each(function(){
    if(isColliding(player,$(this)) && !maskProtect){
      if(!maskOn) {
        curPlayerImg.attr("src","./src/player/player_touched.gif");
        for (var ele of intervalArray){
          clearInterval(ele);
        }

        gameover = true;
        var audio = new Audio('./src/audio/die.mp3');
        audio.volume = volume/100;
        audio.load();
        audio.play();
        setTimeout(() => {audio.pause(); audio.currentTime=0;},1000);
        setTimeout(() => {
          main_menu.show();
          game_over_page.show();
          game_over_score.html(score); 
          actual_game.hide();
          play_button.hide();
          setting_button.hide();

          mask = $(".mask");
          player = $("#player");
          vaccine = $(".vaccine");
          covidComet = $(".covidComet");

          covidComet.each(function(idx,ele){ele.remove()});
          vaccine.each(function(idx,ele){ele.remove()});
          mask.each(function(idx,ele){ele.remove()});
          curPlayerImg.remove();
          player.remove();
          
        },2000);
   
      } else {
        curPlayerImg.attr("src","./src/player/player.gif");
        maskProtect = true;
        maskOn = false;
        setTimeout(()=>{maskProtect = false},1000);
      }
    }
  });
  vaccines.each(function(){
    if(isColliding(player,$(this))){
      var audio = new Audio('./src/audio/collect.mp3');
      audio.volume = volume/100;
      audio.load();
      audio.play();
      setTimeout(() => {audio.pause(); audio.currentTime=0;},1000);
      covid_danger_num_str += 2;
      covid_level_str += 1;
      COVID_SPEED *= 1.2;
      covid_level.html(covid_level_str);
      covid_danger_num.html(covid_danger_num_str);

      $(this).remove();
    }
  })
}

function keyUpRouter(){
  if(!gameover){
    startgame = true;
    if (!maskOn) {
      curPlayerImg.attr("src", "./src/player/player.gif");
    } else {curPlayerImg.attr("src", "./src/player/player_masked.gif");}
  }
}


function keyPressRouter() {
  if (!gameover){
    if (RIGHT) {
      let newPos = parseInt(player.css("left")) + PERSON_SPEED;
      if (newPos > maxPersonPosX) {
        newPos = maxPersonPosX;
      }
      player.css("left", newPos);
      if(!maskOn){
        curPlayerImg.attr("src", "./src/player/player_right.gif");
      } else {
        curPlayerImg.attr("src", "./src/player/player_masked_right.gif");
      }

    }
    if (LEFT) {
      let newPos = parseInt(player.css("left")) - PERSON_SPEED;
      if (newPos < 0) {
        newPos = 0;
      }
      player.css("left", newPos);
      if(!maskOn){
        curPlayerImg.attr("src", "./src/player/player_left.gif");
      } else {
        curPlayerImg.attr("src", "./src/player/player_masked_left.gif");
      }
    }
    if (DOWN) {

      let newPos = parseInt(player.css("top")) + PERSON_SPEED;
      if (newPos > maxPersonPosY) {
        newPos = maxPersonPosY;
      }
      player.css("top", newPos);
      if(!maskOn){
        curPlayerImg.attr("src", "./src/player/player_down.gif");
      } else {
        curPlayerImg.attr("src", "./src/player/player_masked_down.gif");
      }
    }
    if (UP) {
      let newPos = parseInt(player.css("top")) - PERSON_SPEED;
      if (newPos < 0) {
        newPos = 0;
      }    
      player.css("top", newPos);
      if(!maskOn){
        curPlayerImg.attr("src", "./src/player/player_up.gif");
      } else {
        curPlayerImg.attr("src", "./src/player/player_masked_up.gif");
      }
    }
  }
}
// Keydown event handler
document.onkeydown = function(e) {
    if (e.key == 'ArrowLeft') LEFT = true;
    if (e.key == 'ArrowRight') RIGHT = true;
    if (e.key == 'ArrowUp') UP = true;
    if (e.key == 'ArrowDown') DOWN = true;
    
}
// Keyup event handler
document.onkeyup = function (e) {
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
  if (side == 0) {
    curCovidComet.css({"top": 0, "left" : getRandomNumber(0,maxPersonPosX)});
    let speedY = getRandomNumber(0, COVID_SPEED);
    let speedX = Math.pow(COVID_SPEED**2 - speedY**2, 1/2)
    intervalArray.push(setInterval(function() {
      curCovidComet.css({"left": parseInt(curCovidComet.css("left")) + speedX, "top": parseInt(curCovidComet.css("top")) + speedY});
      if(parseInt(curCovidComet.css("left")) < 0 || parseInt(curCovidComet.css("right")) < 0 || parseInt(curCovidComet.css("bottom")) < 0) {
        curCovidComet.remove();
      }
    },100));
  }
  if (side == 1) {
    curCovidComet.css({"bottom": 0, "left" : getRandomNumber(0,maxPersonPosX)});
    let speedY = getRandomNumber(0, COVID_SPEED);
    let speedX = Math.pow(COVID_SPEED**2 - speedY**2, 1/2)
    intervalArray.push(setInterval(function() {
      curCovidComet.css({"left": parseInt(curCovidComet.css("left")) + speedX, "top": parseInt(curCovidComet.css("top")) - speedY});
      if(parseInt(curCovidComet.css("left")) < 0 || parseInt(curCovidComet.css("right")) < 0 || parseInt(curCovidComet.css("top")) < 0) {
        curCovidComet.remove();
      }
    },100))
  }
  if (side == 2) {
    curCovidComet.css({"left": 0, "top" : getRandomNumber(0,maxPersonPosY)});
    let speedX = getRandomNumber(0, COVID_SPEED);
    let speedY = Math.pow(COVID_SPEED**2 - speedX**2, 1/2)
    intervalArray.push(setInterval(function() {
      curCovidComet.css({"left": parseInt(curCovidComet.css("left")) + speedX, "top": parseInt(curCovidComet.css("top")) + speedY});
      if(parseInt(curCovidComet.css("right")) < 0 || parseInt(curCovidComet.css("top")) < 0 || parseInt(curCovidComet.css("bottom")) < 0) {
        curCovidComet.remove();
      }
    },100));
  }
  if (side == 3) {
    curCovidComet.css({"right": 0, "top" : getRandomNumber(0,maxPersonPosY)});
    let speedX = getRandomNumber(0, COVID_SPEED);
    let speedY = Math.pow(COVID_SPEED**2 - speedX**2, 1/2)
    intervalArray.push(setInterval(function() {
      curCovidComet.css({"left": parseInt(curCovidComet.css("left")) - speedX, "top": parseInt(curCovidComet.css("top")) + speedY});
      if(parseInt(curCovidComet.css("left")) < 0 || parseInt(curCovidComet.css("top")) < 0 || parseInt(curCovidComet.css("bottom")) < 0 ) {
        curCovidComet.remove();
      }
    },100));
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
  },maskGone)
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
