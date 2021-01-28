class Ball {
  constructor() {
    this.ballRadius = 10;
    this.color = '#0095DD';
    this.x = 250;
    this.y = 160;
    this.dx = 2;
    this.dy = 2;
  }
  // this method draws the ball
  drawBall(ctx) {
    console.log(ctx);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  // this method changes the position of the ball on the canvas
  move(canvas) {
    // this is what moves the ball (literaly)
    console.log(canvas);
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -(this.dx);
    }
    if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}
// CONSTANTS
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// INITIALIZATIONS
const ball1 = new Ball();
function renderObjectsOnCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball1.move(canvas);
  ball1.drawBall(ctx);
}
setInterval(renderObjectsOnCanvas, 10);


// class for paddle
class Paddle {
  constructor(argpaddleX, argRight, argLeft) {
    this.paddleX = argpaddleX;
    this.rightPressed = argRight;
    this.leftPressed = argLeft;
  }

  // defining paddle variables
  const paddleHeight = 10;
  const paddleWidth = 75;
  const paddleX = (canvas.width - paddleWidth) / 2;
}
