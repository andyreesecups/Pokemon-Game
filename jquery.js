var playing = false;
var score;
var trialsLeft;
var step;
var action;
var pokemons = ['pikachu', 'gotcha', 'littledude', 'pokeball', 'pokebat', 'pokefish', 'pokefish', 'pokeguy', 'pokeheart'];

//click on start reset button
$(function(){
$("#startreset").click(function(){
if(playing == true){

                       //reload page
location.reload();

}else{
playing = true;
                       
    
score = 0;

$("scorevalue").html(score);

                       //show trials left

$("#trialsLeft").show();
trialsLeft = 3;
addHearts();

$("#gameOver").hide();

                       //change button text to reset game

$("#startreset").html("Reset Game");

                       //start dropping pokemon
 startAction();
}
}); 
    
$("#pokemon1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
    
    //play sound
    
    document.getElementById("pokesound").play();
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    $("#pokemon1").hide("explode", 500);
    
    //send new fruit
    setTimeout(startAction, 500);
});


function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
               $("#trialsLeft").append('<img src="images/pokeheart.png" class="life">');
    }
    
}

function startAction(){
    
   $("#pokemon1").show();
    
    choosePokemon();
    $("#pokemon1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
    
    step = 1+ Math.round(5*Math.random());
    
    action = setInterval(function(){
        
        $("#pokemon1").css('top', $("#pokemon1").position().top + step);
        
        if($("#pokemon1").position().top> $("#pokemonContainer").height()){
            
            if(trialsLeft > 1){
                $("#pokemon1").show();
    
    choosePokemon();
    $("#pokemon1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
    
    step = 1+ Math.round(5*Math.random());
                //reduce trials by one
                trialsLeft --;
                //populate trialsLeft box
                addHearts();
                
            }else{//game over
               playing = false;
                
               $("#startreset").html("Start Game");//change to start game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>You caught '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
                
            }
            
        }
    }, 10);
    
}
//generate a new pokemon

function choosePokemon(){
    $("#pokemon1").attr('src', 'images/' + pokemons[Math.round(8*Math.random())] +'.png');
}
 
//stop dropping fruit
function stopAction(){
    clearInterval(action);
    $("#pokemon1").hide();
}
});