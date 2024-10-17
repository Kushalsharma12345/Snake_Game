let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let boardWidth = 1000;
let boardHeight = 600;

let score=0;
let cellSize = 50;
let snakeCell = [[0,0]];

let direction = 'right';

document.addEventListener('keydown',function(event){
    if(event.key==='ArrowDown' || event.key==='s'){direction = 'down'}
    else if(event.key==='ArrowUp' || event.key==='w'){direction = 'up'}
    else if(event.key==='ArrowLeft' || event.key==='a'){direction = 'left'}
    else if(event.key==='ArrowRight' || event.key==='d'){direction='right'}
})
let gameOver = false;

let interval = setInterval(function(){
    update();
    draw();
},200);


let food = generateFood();
function update(){
    let headX = snakeCell[snakeCell.length-1][0];
    let headY = snakeCell[snakeCell.length-1][1];

    // let newHeadX = headX+cellSize;
    // let newHeadY = headY;
    let newHeadX;
    let newHeadY;

    if(direction==='right'){
        newHeadX = headX+cellSize;
        newHeadY = headY;
        if(newHeadX==boardWidth || khudkokatgya(newHeadX,newHeadY)){
            gameOver=true;
        }
    }
    else if(direction==='left'){
        newHeadX = headX-cellSize;
        newHeadY = headY;
        if(newHeadX<0 || khudkokatgya(newHeadX,newHeadY)){
            gameOver=true;
        }
    }
    else if(direction==='up'){
        newHeadX = headX;
        newHeadY = headY-cellSize;
        if(newHeadY<0 || khudkokatgya(newHeadX,newHeadY)){
            gameOver=true;
        }
    }
    else{
        newHeadX = headX;
        newHeadY = headY+cellSize;
        if(newHeadY===boardHeight || khudkokatgya(newHeadX,newHeadY)){
            gameOver = true;
        }
    }

    snakeCell.push([newHeadX,newHeadY]);

    if(newHeadX === food[0] && newHeadY===food[1]){
        food = generateFood();
        score++;
    }
    else{
    snakeCell.shift();
    }
}


function draw(){
    
    if(gameOver===true){
        clearInterval(interval);
        ctx.font = '50px monospace'
        ctx.fillStyle = 'red';
        ctx.fillText('GAME OVER !!',350,300);
        return;
    }

    
    ctx.clearRect(0,0,boardWidth,boardHeight);
    for(let cell of snakeCell){
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'blue'
        ctx.fillRect(cell[0],cell[1],cellSize,cellSize);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(cell[0],cell[1],cellSize,cellSize);
    }
    ctx.fillStyle = 'green'
    ctx.fillRect(food[0],food[1],cellSize,cellSize);
    ctx.font = '25px monospace'
    ctx.fillText(`Score:${score}`,30,30);
}



function generateFood(){
    return[
        Math.round((Math.random()*(boardWidth-cellSize))/cellSize)*cellSize,
        Math.round((Math.random()*(boardHeight-cellSize))/cellSize)*cellSize,

    ]
}

function khudkokatgya(newHeadX,newHeadY){
    for(let item of snakeCell){
        if(item[0] == newHeadX && item[1] == newHeadY){
            return true;
        }
    }
    return false;
}