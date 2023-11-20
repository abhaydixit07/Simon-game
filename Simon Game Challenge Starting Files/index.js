var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameON = false;


$(document).keypress(function(){
        if (!gameON){
        $("h1").text("Level "+level);
        newSequence();
        
        gameON=true;
        }
        
    })



$(".btn").click(function (){

    var userChosenColor = $(this).attr("id");
    
    playSound(userChosenColor);
    animateClick(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
})


function playSound(id){
    var audio = new Audio("./sounds/"+id+".mp3")
    audio.play();
} 
function animateClick(id){
    $("#"+id).addClass("pressed")
    setTimeout(function(){
        $("#"+id).removeClass("pressed");
    }, 200)
}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          newSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}



function newSequence(){
    
    var randomNumber = Math.random();
    userClickedPattern = [];
    randomNumber = randomNumber*4
    $("h1").text("Level "+level);
    randomNumber = Math.floor(randomNumber);
    randomButtonColor = buttonColors[randomNumber];
    required_button = $("#"+randomButtonColor);
    required_button.fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
    gamePattern.push(randomButtonColor);
    playSound(randomButtonColor);
    level++;
    
}
function startOver() {
    level = 0;
    gamePattern = [];
    gameON = false;
  }




