// console.log('hello world');
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var gameStarted = true;

var level = 0;


$(document).keypress(function(){

  if (gameStarted) {

    nextSequence();
    gameStarted = false;


  }
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log('success');

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log('wrong');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 2000);
    $('h1').html('Game Over, Press Any Key to Restart');
    startOver();
  }

}

function animatePress(currentColor) {
  // console.log(currentColor);
  $('#' + currentColor).addClass('pressed');

  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);

}

function playSound(name) {

  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();

}

function nextSequence() {

  userClickedPattern = [];
  level ++;
  $('h1').html('Level ' + level);

  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

$('.btn').click(function() {
  // console.log('Je suis cliqué');
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function startOver() {

  level = 0;
  gamePattern = [];
  gameStarted = true;
  
}
