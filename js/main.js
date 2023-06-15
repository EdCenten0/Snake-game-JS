const play_board = document.querySelector('.wrapper__play_board');


let foodX;
let foodY;
let snakeX = 5;
let snakeY = 10;
let velocityX = 0;
let velocityY = 0;


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
    }

    snakeX += velocityX;
    snakeY += velocityY;

    
    play_board.innerHTML = htmlMarkup;
    play_board.innerHTML = htmlMarkups;
}

foodRandomizer();
setInterval(initGame, 100);
document.addEventListener("keydown", changeDirection)