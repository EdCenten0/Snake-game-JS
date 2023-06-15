const play_board = document.querySelector('.wrapper__play_board');


let foodX;
let foodY;
let snakeX = 5;
let snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];


const foodRandomizer =  () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    console.log(foodX, foodY)
}

const changeDirection= (e) => {
    // console.log(e)
    if(e.key === "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }

    // initGame();
}

const initGame = () =>{
    let htmlMarkup = ` <div class="wrapper__play_board__food" style="grid-area: ${foodY} /  ${foodX}"></div>`;
    htmlMarkup += ` <div class="wrapper__play_board__head" style="grid-area: ${snakeY} /  ${snakeX}"></div>`;

    if(snakeX == foodX && snakeY == foodY){
        foodRandomizer();
        snakeBody.push(foodX,foodY);
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += ` <div class="wrapper__play_board__head" style="grid-area: ${snakeBody[i][1]} /  ${snakeBody[i][0]}"></div>`;
    }
    
    play_board.innerHTML = htmlMarkup;
    play_board.innerHTML = htmlMarkups;
}

foodRandomizer();
setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection)