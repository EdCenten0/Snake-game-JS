const play_board = document.querySelector('.wrapper__play_board');


let foodX;
let foodY;
let snakeX = 5;
let snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;


const foodRandomizer =  () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    console.log(foodX, foodY)
}

const handleGameOver = () =>{
    clearInterval(setIntervalId);
    alert("Game Over");
    location.reload();
}

const changeDirection= (e) => {
    // console.log(e)
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

    // initGame();
}

const initGame = () =>{
    if (gameOver) return handleGameOver();

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

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += ` <div class="wrapper__play_board__head" style="grid-area: ${snakeBody[i][1]} /  ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody [0][0] === snakeBody [i][0]){
            gameOver = true
        }
    }

    
    
    play_board.innerHTML = htmlMarkup;
    play_board.innerHTML = htmlMarkups;
}

foodRandomizer();
setIntervalId = setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection)