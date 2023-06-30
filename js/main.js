//Vars
let foodX;
let foodY;
let snakeX = 5;
let snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId; // Identifier for the game interval
let score = 0; // Current score
let highestScore = localStorage.getItem("wrapper__game_details__highest_score p") || 0;

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

//Functions
const foodRandomizer =  () =>{
    //It makes the position of food change it position when is required using Math library for choosing random numbers
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () =>{
    clearInterval(setIntervalId);

    //I make appear a loose banner, you can start a new match using it
    loose_banner.classList.remove("inactive");
    loose_banner.classList.add("scale");
    setScore();
    //loose banner has a button, that button has this eventlistener to start a new match
    loose_banner__play_again__button.addEventListener('click',reloadGame);
}

//It just reload the page
const reloadGame = () => {
    location.reload()
}

//It set the current score and the highest score on the loose banner
const setScore = () =>{
    loose_banner__messages_score.innerHTML = `Current score: ${score}`;
    loose_banner__messages_highest_score.innerHTML = `Max score: ${highestScore}`;
}

//This arrow function receives an keyPressed event, using it you can change the snake direction
const changeDirection= (e) => {
        //If the keypressed is the ArrowUp Key and the velocity is different of 1 it will let you move one position up
        //When it ask if velocityY != it is because it validates you're not going down, because on the original game you cannot turn 90 degrees from your current direction
        //It updates velocity
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
        
}

//Using the divs of the mobile controls, each one has the click event, so this foreach goes over each element looking for an event on js runtime
mobile_controls.forEach(key => {
    key.addEventListener("click", () => {
      const direction = key.getAttribute("data-key");
      changeDirection({ key: direction });
    });
  });


//The function where games executes during an interval 
const initGame = () =>{
    //Highest score is save on memory, so if it exist it will appear on new games
    wrapper__game_details__highest_score.innerHTML = `Highest score: ${highestScore}`; 
    //Checking if game is over
    if (gameOver) return handleGameOver();

    //setting food and head ubication
    let htmlMarkup = ` <div class="wrapper__play_board__food" style="grid-area: ${foodY} /  ${foodX}"></div>`;
    htmlMarkup += ` <div class="wrapper__play_board__head" style="grid-area: ${snakeY} /  ${snakeX}"></div>`;

    //Snake has eaten a new fruit
    if(snakeX == foodX && snakeY == foodY){
        //Setting a new random location for food
        foodRandomizer();
        //the snake body is an array, so we only push a new element to make it one more bigger
        snakeBody.push(foodX,foodY);
        score++;

        //If the current score is higher than the highest score, the new highest will be the current
        highestScore = score >= highestScore ? score: highestScore;
        //highestScore is saved on storage
        localStorage.setItem("wrapper__game_details__highest_score p", highestScore);
        //score is shown on screen
        wrapper__game_details__score.innerHTML = `Score: ${score}`;
        wrapper__game_details__highest_score.innerHTML = `Highest score: ${highestScore}`;
        
    }

     // Update the positions of the snake body segments
    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    // Update the position of the snake head based on the velocity
    snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;

     // Check for collisions with the game boundaries
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    // Check for collisions with the snake body
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
