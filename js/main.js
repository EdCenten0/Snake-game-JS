//imports



//HTML elements
const loose_banner = document.querySelector('.loose_banner');
const loose_banner__play_again__button = document.querySelector('.loose_banner__play_again button')
const loose_banner__messages_score = document.querySelector('.loose_banner__messages p:nth-child(2)')
const loose_banner__messages_highest_score = document.querySelector('.loose_banner__messages p:nth-child(3)')
const play_board = document.querySelector('.wrapper__play_board');
const wrapper__game_details__score = document.querySelector('.wrapper__game_details__score p');
const wrapper__game_details__highest_score = document.querySelector('.wrapper__game_details__highest_score p');
const mobile_controls = document.querySelectorAll(".console__controls > div");
let mobileWidth = window.innerWidth <= 768 ? true : false;


//Vars
let foodX;
let foodY;
let snakeX = 5;
let snakeY = 10;
export let velocityX = 0;
export let velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;
let highestScore = localStorage.getItem("wrapper__game_details__highest_score p") || 0;

//Functions
const foodRandomizer =  () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    console.log(foodX, foodY)
}

const handleGameOver = () =>{
    clearInterval(setIntervalId);
    loose_banner.classList.remove("inactive");
    loose_banner.classList.add("scale");
    setScore();
    loose_banner__play_again__button.addEventListener('click',reloadGame);

    
}

const reloadGame = () => {
    location.reload()
}

const setScore = () =>{
    loose_banner__messages_score.innerHTML = `Current score: ${score}`;
    loose_banner__messages_highest_score.innerHTML = `Max score: ${highestScore}`;
}

const changeDirection= (e) => {
    // if(!mobileWidth){
    //     if(e === "ArrowUp" && velocityY != 1){
    //         velocityX = 0;
    //         velocityY = -1;
    //     }else if(e === "ArrowDown" && velocityY != -1){
    //         velocityX = 0;
    //         velocityY = 1;
    //     }else if(e === "ArrowLeft" && velocityX != 1){
    //         velocityX = -1;
    //         velocityY = 0;
    //     }else if(e === "ArrowRight" && velocityX != -1){
    //         velocityX = 1;
    //         velocityY = 0;
    //     }
    // }else{
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
    // }
        
}

mobile_controls.forEach(key => {
    key.addEventListener("click", () => {
      const direction = key.getAttribute("data-key");
      changeDirection({ key: direction });
    });
  });

const initGame = () =>{    
    // if(mobileWidth){
    //     mobile_controls.forEach(key =>{
    //         key.addEventListener("click", changeDirection({key: key.dataset.key}))
    //     })
    // }

    wrapper__game_details__highest_score.innerHTML = `Highest score: ${highestScore}`; 
    if (gameOver) return handleGameOver();

    let htmlMarkup = ` <div class="wrapper__play_board__food" style="grid-area: ${foodY} /  ${foodX}"></div>`;
    htmlMarkup += ` <div class="wrapper__play_board__head" style="grid-area: ${snakeY} /  ${snakeX}"></div>`;

    if(snakeX == foodX && snakeY == foodY){
        foodRandomizer();
        snakeBody.push(foodX,foodY);
        score++;

        highestScore = score >= highestScore ? score: highestScore;
        localStorage.setItem("wrapper__game_details__highest_score p", highestScore);
        wrapper__game_details__score.innerHTML = `Score: ${score}`;

        wrapper__game_details__highest_score.innerHTML = `Highest score: ${highestScore}`;
        
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
    play_board.innerHTML = htmlMarkup;
}



foodRandomizer();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keydown", changeDirection)
