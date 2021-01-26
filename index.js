// storing a reference for the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//defining the canvas
var x = canvas.width/2;
var y = canvas.height-30;

//defining the speed of the ball
var dx = 2;
var dy = -2;

//defining ball size
var ballRadius = 10;

//defining paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

//defining the paddle key booleans
var rightPressed = false;
var leftPressed = false;

//initialize variables for the bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//initialize score
var score = 0;

//initialize player lives
var lives = 3;

//create the bricks
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// event listeners for when the keys are being pressed to move the paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// event listener for mouse movement
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
} // end of mouseMoveHandler

// if statements to change the key booleans if they're pressed
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
} // end of keyDownHandler

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
} // end of keyUpHandler

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status == 1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount) {
                alert("YOU WIN, CONGRATS!");
                document.location.reload();
            }
            }
        }
        }
    }
} // end of collisionDetection

// function to write the score 
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#3a3a3a";
    ctx.fillText("Score: "+score, 8, 20);
} // end of drawScore

//function to write the number of lives 
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#3a3a3a";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
} //endof drawLives

// drawing the ball over and over while it moves
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#3a3a3a";
    ctx.fill();
    ctx.closePath();
} //end of drawBall

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    ctx.fillStyle = "#" + randomColor;
    ctx.fill();
    ctx.closePath();
} //end of drawPaddle

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                var randomColor = Math.floor(Math.random()*16777215).toString(16);
                ctx.fillStyle = "#" + randomColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
} //end of drawBricks

// redraw the canvas over and over 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();

    // This will allow the ball to bounce off the 4 corners of the canvas
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    // move the paddle when keys are pressed
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    // This is what moves the ball
    x += dx;
    y += dy;

    requestAnimationFrame(draw);
} // end of draw

//redraw the canvas 
draw();