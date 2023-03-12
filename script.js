console.log("Heloo");
let position={x:0 ,y:0};
let gameOver=new Audio("music/gameover.mp3");
let eatSound=new Audio("music/food.mp3");
let moveSound=new Audio("music/move.mp3");
let music=new Audio("music/music.mp3");
let board=document.getElementById("board");
let scoreDisplay=document.getElementById("Score");
let hscoreDisplay=document.getElementById("hiScore");

let lastPaint=0;
let speed=7;
let score=0;
let snakeArr=[
    {x:10,y:10},
]
let food={x:8 ,y:13};


function main(time){
    window.requestAnimationFrame(main);
    
    if((time-lastPaint)/1000<(1/speed)){
        return ;
    }
    lastPaint=time;
    music.play();
    game();

}
function collide(){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y){
            return true;
        }
    }
    if(snakeArr[0].x>22 ||snakeArr[0].y>22 ||snakeArr[0].x<=0 || snakeArr[0].y<=0){
        return true;
    }
    return false;
}

function game(){
    if(collide()){
        gameOver.play();
        music.pause();
        music.currentTime=0;
        position={x:0 ,y:0};
        score=0;
        snakeArr=[{x:10 ,y:10}];
        alert("GameOver Press any Key to Restart");
        music.play();
    }
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        eatSound.play();
        score++;
        scoreDisplay.firstChild.innerText="Score: "+score;

        if(score>hiScoreVal){
            hiScoreVal=score;
            localStorage.setItem("hiScore",JSON.stringify(hiScoreVal));
            hscoreDisplay.firstChild.innerText="HiScore: "+hiScoreVal;

        }
        snakeArr.unshift({x:(snakeArr[0].x+position.x),y:(snakeArr[0].y +position.y)});
        food={x:Math.floor(Math.random()*22+1),y:Math.floor(Math.random()*22+1)};
    }
    for(var i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=position.x;
    snakeArr[0].y+=position.y;

    //Display
    board.innerHTML="";
    snakeArr.forEach((ele,index)=>{
        snake=document.createElement("div");
        snake.style.gridRowStart=ele.y;
        snake.style.gridColumnStart=ele.x;
        board.appendChild(snake);
        if(index===0){
            snake.classList.add("head");
        }
        else{
            snake.classList.add("snake");
        }
    });
    let food1=document.createElement("div");
    food1.style.gridColumnStart=food.x;
    food1.style.gridRowStart=food.y;
    board.appendChild(food1);
    food1.classList.add("food");
}
let hiScore=localStorage.getItem("hiScore");
if(hiScore===null){
    var hiScoreVal=0;
    localStorage.setItem("hiScore",JSON.stringify(hiScoreVal));

}
else{
    hiScoreVal=JSON.parse(hiScore);
    hscoreDisplay.firstChild.innerText="HiScore: "+hiScore;



}

window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    position={x:0,y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            position.y=-1;
            position.x=0;
            break;
        case "ArrowDown":
            position.y=1;
            position.x=0;
            break;
        case "ArrowRight":
            position.x=1;
            position.y=0;
            break; 
        case "ArrowLeft":
            position.x=-1;
            position.y=0;
            break;  
        default:
            break;          
    }

});