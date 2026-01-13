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

const fsBtn = document.getElementById("fullscreen-btn");

fsBtn.addEventListener("click", function () {
  const el = document.documentElement;

  if (!document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement) {

    const rfs =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;

    rfs && rfs.call(el);
  } else {
    const efs =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;

    efs && efs.call(document);
  }
});

document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);
document.addEventListener("mozfullscreenchange", updateFullscreenButton);
document.addEventListener("MSFullscreenChange", updateFullscreenButton);

function updateFullscreenButton() {
  const isFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;

  fsBtn.textContent = isFullscreen ? "Exit Screen" : "Fullscreen";
}

// function saveHighScore(playerName, level) {
//   let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

//   leaderboard.push({ name: playerName, level: level });

//   leaderboard.sort((a, b) => b.level - a.level);
//   leaderboard = leaderboard.slice(0, 5);

//   localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
// }

// function renderLeaderboard() {
//   const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
//   const list = document.getElementById('leaderboard');
//   list.innerHTML = "";

//   leaderboard.forEach((entry, index) => {
//     const li = document.createElement('li');
//     li.textContent = `${index + 1}. ${entry.name} - L${entry.level}`;
//     list.appendChild(li);
//   });
// }

// w

// function handleGameOver() {
//   // your game-over effects...

//   let playerName = prompt("Game Over! Enter your name:");
//   if (playerName) {
//     saveHighScore(playerName, level); // use your level variable
//     renderLeaderboard();
//   }

//   startOver(); // or however you reset the game
// }
