var playing = false;
var score;
var timeRemaining;
var action;
var correctAnswer;
let bodybg=document.querySelector("html")
let timerbg=document.getElementById("time")



//the user clicks on the start/reset
document.getElementById("start").onclick = function(){

    //if the user is playing
    if (playing == true){
        //reload page
        location.reload(); 
    }
    //if the user is not playing
    else
    {
    
        playing=true;
        score=0;        
        document.getElementById("scoreNumber").innerHTML=score;

        //show the instructions     

        //show countdown box
        show("time");

        //30 seconds timer
        timeRemaining = 40;
        document.getElementById("remainingTime").innerHTML=timeRemaining;

        //hide game over box
        hide("gameover");

        //change button to reset
        document.getElementById("start").innerHTML="Reset Game";

        //start countdown
        startCountdown();

        //generate new question and answers  
        generateQA();             
    }   
}

//the user clicks on the answer box
for(var i=1; i<5; i++){
    document.getElementById("answer"+i).onclick=function(){    
        if(playing==true){

            //if the answer is correct
            //this=document.getElementById("answer1")
            if (this.innerHTML==correctAnswer)
            { 
                //correct answer
                score++;
                document.getElementById("scoreNumber").innerHTML=score;
                show("right");

                //show for 1 sec
                setTimeout(function(){
                    hide("right");
                },1000);    
                hide("wrong");
                //generate new answer and question
                generateQA();
            }
            else
            {  

                //wrong answer
                show("wrong");

                shakanimastion("problem")

                //show for 1 sec
                setTimeout(function(){
                    hide("wrong");
                    stopanimastion("problem")
                }, 700)
                hide("right");
            }             
        }
    }
}

//functions 

//start countdown 20sec
function startCountdown(){
    action = setInterval(function(){
        timeRemaining-=1;
        document.getElementById("remainingTime").innerHTML = timeRemaining;
        if(timeRemaining == 0)
        {//game over
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML= "<p>GAME OVER!</p><p>YOUR SCORE: " + score+ "</p>"; 
            if (score<5){
                document.getElementById("gameover").innerHTML="<h2>GAME OVER</h2><p>YOUR SCORE: "+score+"</p><p>You Still Need Practice</p>"
            }
            else if(score>=5 && score<10){
                document.getElementById("gameover").innerHTML="<h2>GAME OVER</h2><p>YOUR SCORE: "+score+"</p><p>Not Bad Keep Going</p>"
            }
            hide("time");
            hide("right");
            hide("wrong");
            playing=false;
            document.getElementById("start").innerHTML = "Start Game";
        }
        else if(timeRemaining <= 5){    //changes the red color when timer go below 5 sec
           timerbg.style.backgroundColor="red"

        }
    },1000);
}

//generate question and answers 
function generateQA(){
    //a random digit from 0 to 10 inclusive
    var randomNumber1 = Math.round(Math.random()*10);   
    var randomNumber2 = Math.round(Math.random()*10);     

    document.getElementById("problem").innerHTML=randomNumber1+ " x " +randomNumber2;
    correctAnswer=randomNumber1*randomNumber2;  
    var answerBox= (Math.round(Math.random()*3))+1;

    //to fill on if the random answer boxes with the right answer
    document.getElementById("answer"+answerBox).innerHTML=correctAnswer; 

    //storing answer choices;    
    var answers=[correctAnswer];

    //to fill the other answer boxes with the wrong answers   

    //make sure to exclude the box with the right answer
    for (var i=1; i<5; i++)
    {if (i!==answerBox)
    { 
        var wrongAnswer;
        // check that the wrong answer is not equal to the right answer or another taken wrong answer
        //do: at least one possible answer, while: generate then a new possible answer, if the previous answer is not ok
        do{
            wrongAnswer = (Math.round(Math.random()*10))*(Math.round(Math.random()*10));
        }            
        while(answers.indexOf(wrongAnswer)>-1)  //wrongAnswer is already in the answer list, we countinue do loop   

            document.getElementById("answer"+i).innerHTML=wrongAnswer;
        //adding wrong answer to answer choices
        answers.push(wrongAnswer);
    }
    }
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}
//hide an element      
function hide(id){      
    document.getElementById(id).style.display="none";      
}   
//show an element
function show(id){      
    document.getElementById(id).style.display="block";      
}   
function shakanimastion(id){
    document.getElementById(id).style.animation=".2s  infinite slidein"
    // document.getElementById(id).style.animationIterationCount="2"

} 
function stopanimastion(id){
    document.getElementById(id).style.animationPlayState="paused"
}



