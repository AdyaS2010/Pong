const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, '#fff');
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
}

function movePaddles() {
    if (ballY > aiY + paddleHeight / 2) {
        aiY += 6;
    } else {
        aiY -= 6;
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawNet();
    drawRect(0, playerY, paddleWidth, paddleHeight, '#fff');
    drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, '#fff');
    drawCircle(ballX, ballY, ballRadius, '#fff');
}

function update() {
    moveBall();
    movePaddles();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    playerY = event.clientY - rect.top - paddleHeight / 2;
});

gameLoop();
