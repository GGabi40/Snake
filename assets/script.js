// board
const blockSize = 25;
const rows = 20;
const cols = 24;

let board;
let context;

// SNAKE
// head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// body
let snakeBody = [];

let velocityX = 0;
let velocityY = 0;

// FOOD
let foodX;
let foodY;

let gameOver = false;

window.onload = () => {
  board = document.querySelector("#board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");
  repeatButton = document.querySelector('#repeat');
  tutorial = document.querySelector('#tutorial');

  placeFood();
  document.addEventListener("keyup", changeDirection);
  // update();
  // 100 milisec to update the update function
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) return;

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  // Arrancas de la cola a ubicar los cuadrados siguientes
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    // si hay partes del cuerpo
    snakeBody[0] = [snakeX, snakeY]; // el primero sigue la cabeza
  }

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  //                 X       Y       Width      Height
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // Game Over conditions:
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("GAME OVER");
    repeatButton.style.display = 'block';
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert('GAME OVER');
      repeatButton.style.display = 'block';
    }
  }
}

function changeDirection(ev) {
  tutorial.style.display = "none";
  if (ev.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (ev.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (ev.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (ev.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function reload() {
    location.reload();
}


// Be able to play on the phone
// Responsible
// Start Menu -- optional