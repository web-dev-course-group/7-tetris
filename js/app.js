/*
Start date: 2021-07-29
Based on: Learn JavaScrip by Building 7 Games - Full Course - 2020.mp4
Games go from easiest to hardest
Instructor: @Ania_Kubow (twitter)

Known bugs

*/

const grid = document.querySelector('.grid');
const displaySquares = document.querySelector('.previous-grid div');
//let squares = Array.from(grid.querySelectorAll('div'));
const width = 10;
const height = 20;
let currentPosition = 4;

//create 10x20 grid = 200 divs
const numberOfDivs = width * height;
for (i = 1; i <= numberOfDivs; i++) {
  const div = document.createElement('div');
  grid.appendChild(div);
}
let squares = document.querySelectorAll('.grid div');

// Assign functions to keycodes
function control(e) {
  if(e.KeyCode === 39) {
    moveRight();
  } else if (e.KeyCode === 38) {
    rotate();
  } else if (e.KeyCode === 37) {
    moveLeft();
  } else if (e.KeyCode === 40) {
    moveDown();
  }
}
document.addEventListener('keyup', control);

// The Tetrominoes - 1:24 h:mm - with four rotations each
const lTetromino = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2+2],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2]
];

const zTetromino = [
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1],
  [0, width, width+1, width*2+1],
  [width+1, width+2, width*2, width*2+1]
];

const tTetromino = [
  [1, width, width+1, width+2],
  [1, width+1, width+2, width*2+1],
  [width, width+1, width+2, width*2+1],
  [1, width, width+1, width+2, width*2+1],
  [1, width, width+1, width*2+1]
];

const oTetromino = [
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1],
  [0, 1, width, width+1]
];

const iTetromino = [
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3],
  [1, width+1, width*2+1, width*3+1],
  [width, width+1, width+2, width+3]
];

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

// Randomly select Tetromino
let random = Math.floor(Math.random()*theTetrominoes.length);
let currentRotation = 0;
let current = theTetrominoes[random][currentRotation];

// Draw the shape
function draw() {
  current.forEach(index => (
    squares[currentPosition + index].classList.add('block')
  ))
};

// Undraw the shape
function undraw() {
  current.forEach(index => (
    squares[currentPosition + index].classList.remove('block')
  ))
};

// Move down shape
function moveDown() {
  undraw();
  currentPosition = currentPosition += width;
  draw();
  //freeze();
}

// Move left and prevent collisions with shapes moving left - 1:28:12 h:mm:ss
function moveRight() {
  undraw();
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
  if(!isAtRightEdge) currentPosition += 1;
  if(current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
    currentPosition -= 1;
  }
  draw();
}

function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
  if(!isAtLeftEdge) currentPosition -= 1;
  if(current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
    currentPosition += 1;
  }
  draw();
}

// Rotate Tetromino
function rotate() {
  undraw();
  currentRotation++;
  if(currentRotation === current.length) {
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  draw();
}

// Show previous tetromino is displaySquares 1:49:09 h:mm:ss
