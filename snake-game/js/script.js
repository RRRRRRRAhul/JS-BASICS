// variable to keep track of the last time the screen was updated and audio files
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("bgm/food.mp3");
let gameOverSound = new Audio("bgm/game-over-38511.mp3");
let moveSound = new Audio("bgm/move.mp3");
let musicSound = new Audio("bgm/game_bg.wav");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 15, y: 16 }];

let food = { 
    x: Math.floor(2 + (16 - 2) * Math.random()), 
    y: Math.floor(2 + (16 - 2) * Math.random())
}; // food position

// game loop
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;

    lastPaintTime = ctime;
    gameEngine();
}

function isColided(snakeArr) {
    // if snake collides with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    // if snake collides with wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    // PART 1: Move the snake ONLY if a key was pressed
    let moved = false;
    if (inputDir.x !== 0 || inputDir.y !== 0) {
        moved = true;

        // Move body: shift each segment to the position of the previous one
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }

        // Move head
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    }

    // PART 2: Check collision (only after moving)
    if (moved && isColided(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 15, y: 16 }];
        musicSound.play();
        score = 0;
        //to show score after game over
        document.getElementById('score').innerHTML = "Score: " + score;
        speed = 2;
        return; // stop here, no further code
    }

    // PART 3: Check if food is eaten (only after moving)
    if (moved && snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        // Play food sound
        foodSound.play();

        // increde score 
        let scoreBox = document.getElementById('score').innerHTML = "Score: " + ++score;
        // Update high score if needed
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", JSON.stringify(highScore));
            document.getElementById('high_score').innerHTML = "High Score: " + highScore;
        }

        // Increase speed every 5 points
        if (score % 5 === 0) {
            speed += 1;
        }
        
        // Grow snake: add new segment at the tail
        snakeArr.push({ ...snakeArr[snakeArr.length - 1] });

        // Generate new food
        let a = 2, b = 16;
        food = {
            x: Math.floor(a + (b - a) * Math.random()),
            y: Math.floor(a + (b - a) * Math.random())
        };

        // Stop movement AFTER growing (so we don't collide with ourselves)
        inputDir = { x: 0, y: 0 };
    }

    // PART 4: Draw snake and food
    let board = document.querySelector('.board');
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? 'head' : 'snake');
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    // If we moved but did NOT eat food, stop movement (one step only)
    if (moved) {
        inputDir = { x: 0, y: 0 };
    }
}

let highScore = localStorage.getItem("highScore") || 0;
document.getElementById('high_score').innerHTML = "High Score: " + highScore;


window.requestAnimationFrame(main);

// Listen for key presses
window.addEventListener('keydown', e => {
    if (moveSound) moveSound.play();
    if (musicSound.paused) musicSound.play();

    switch (e.key) {
        case "ArrowUp":
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            inputDir = { x: 1, y: 0 };
            break;
        default:
            break;
    }
});
