// Base code is from the book "The Nature of Code"
// Commented lines are added for variation

let w = 8;
let columns = 640 / w;
let rows = 640 / w;
let board = create2DArray(columns, rows);
let next = create2DArray(columns, rows);
let gen_count = 0; // track generations


function create2DArray(columns, rows) {
  let arr = new Array(columns);
  for (let i = 0; i < columns; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}


function setup() {
  createCanvas(640, 640);
  
  frameRate(10);
  
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = floor(random(2)); 
    }
  }
}


function draw() {
  background(0);
  
  // Every 5th generation, randomly kill some cells
  if (gen_count % 5 === 0) {
    randomlyKillCells();
  }
  
  
  for (let i =1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++ ) {
      let total_neighbors = 0;
      
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          total_neighbors += board[i+k][j+l];
        }
      }
      total_neighbors -= board[i][j];
      
      // Rule set
      if (board[i][j] === 1 && total_neighbors < 2) next[i][j] = 0;
      else if (board[i][j] === 1 && total_neighbors > 3) next[i][j] = 0;
      else if (board[i][j] === 0 && total_neighbors === 3) next[i][j] = 1;
      else next[i][j] = board[i][j];
    }
  }
  board = next;
  
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Alive cells = random color w/ random transparency
      fill(board[i][j] === 1 ? color(random(255), random(255), random(255), random(100, 255)) : color(0, 0, 0));
      noStroke();
      rect(i * w, j * w, w);
    }
  }
  gen_count++;
}

// Function to randomly kill some cells
function randomlyKillCells() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (random() < 0.3) {  // 30% chance to kill a cell
        board[i][j] = 0;
      }
    }
  }
}
