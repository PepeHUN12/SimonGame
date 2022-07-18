var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;
// nem tudom hogy jó-e a keypress vagy legyen inkább click
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkAnwser(userClickedPattern.length-1);
});


function checkAnwser(currentLevel1){
    if (gamePattern[currentLevel1] === userClickedPattern[currentLevel1]) {
            console.log("siker");

            if(userClickedPattern.length === gamePattern.length){

                setTimeout(function(){nextSequence();},1000)
            }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 400);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            startOver();
        },2000);
       
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
    userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  var selectedBtn = $("." + randomColor);
  selectedBtn.fadeOut().fadeIn();
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


