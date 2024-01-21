// can do this in modules
// should decide on what features would be the best

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const con = document.querySelector(".console");
    let gameOver = false;
    let isJumping = false; // Flag to track if the dino is currently jumping
    
    // create dino object
    let dino = {
        x: 50,
        y: canvas.height - 50,
        height: 50,
        width: 50,
        jumpHeight: 100
    }

    // create obstacle object
    let obstacle = {
        x: canvas.width, //value to start, meaning the obstacle starts at the far right of canvas
        y: canvas.height - 50,
        height: 50,
        width: 20
    }

    function detectCollision() {
        let dinoLeft = dino.x;
        let dinoRight = dino.x + dino.width;
        let dinoTop = dino.y;
        let dinoBottom = dino.y + dino.height;
        
        let obstacleLeft = obstacle.x;
        let obstacleRight = obstacle.x + obstacle.width;
        let obstacleTop = obstacle.y;
        let obstacleBottom = obstacle.y + obstacle.height;

        if (
            // the objects overlap
            obstacleLeft < dinoRight && // if the left side of the obstacle passes the right stide of the dino
            obstacleRight > dinoLeft && // if the right side of the obstacle is in front of the dino
            obstacleTop < dinoBottom && // if the top of the obstacle is above the dino
            obstacleBottom > dinoTop // if the bottom of the obstacle passes through the top of the top of the dino
        ) {
            con.innerHTML = "collision occured"
            gameOver = true;
        }
    }

    function jump() {
        if (!isJumping) {
            isJumping = true;
            let jumpInterval = setInterval(function () {
            if (dino.y > canvas.height - dino.height - dino.jumpHeight) {
                dino.y -= 5; // Move the dino upward
            } else {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(function () {
                if (dino.y < canvas.height - dino.height) {
                    dino.y += 5; // Move the dino downward
                } else {
                    clearInterval(fallInterval);
                    isJumping = false; // Reset the jump flag
                }
                }, 20);
            }
            }, 20);
        }
    }

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            jump();
        }
    });

    function drawGame() {
        // Clear canvas each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Draw character
        ctx.fillStyle = '#4CAF50'; // Green
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    
        // Draw the obstacle
        ctx.fillStyle = '#f44336'; // Red
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    
        // Move the obstacle to the left
        obstacle.x -= 2;
    
        // Check if there was a collision
        detectCollision();

        // If the obstacle goes off the screen, its position is reset
        if (obstacle.x + obstacle.width < 0) {
            obstacle.x = canvas.width;
        }
    
        if (!gameOver) {
            // Request the next frame to continue the animation
            requestAnimationFrame(drawGame);
        }
        else {
            con.innerHTML = "game over"
        }
    }

    // Start the game loop
    drawGame();
});

