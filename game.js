var gamePattern =[];
var userClickedPattern =[];
var buttonColours =["red", "blue", "green", "yellow" ];
var level = 0;
var started = false;

function nextSequence(){
      userClickedPattern=[];
    level++;
    $("h1").text("Level " + level );  
    var randomNumber = Math.floor(Math.random() *4);
   var randomChosenColour =  buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

$(".btn").click(function (){
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var music = new Audio('sounds/' + name + '.mp3');
    music.play();
}

function animatePress(currentColor){
        $("." + currentColor).addClass('pressed');
        setTimeout(function(){
            $("." + currentColor).removeClass('pressed');}
        ,100);
    
}


 
$(document).on("keydown" ,function (){
    if(!started){
    nextSequence();   
    started = true;
} 
});
  
function checkAnswer(currentLevel){
    console.log("game Pattren: "+gamePattern);
    console.log("user Pattern: "+userClickedPattern);
    
   
    if( gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
    setTimeout( function(){
        nextSequence();
    },1000);  
        
    }       }
    
    else{
        $("body").addClass("game-over");
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
$("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function startOver() {
    gamePattern=[];
    started=false;
    level=0;
}
