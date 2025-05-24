var buttonColours =["red", "blue", "green", "yellow"];

var userClickedPattern=[];
var gamePattern=[];

var level=0;
var started=false;

$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(userClickedPattern.length==gamePattern.length){
        userClickedPattern=[];
        setTimeout(function(){
            nextSequence();
        },100);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 300);

    startOver();
    }
}

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio= new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");}, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern = [];
    started=false;
}


