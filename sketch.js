//Generate 2D Array
function make2DArray(cols,rows) {
  let arr = new Array(cols);
  for (let i=0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  return arr;
}
//Declare global concern variables
let grid;
let cols;
let rows;
let res = 5;

function setup(){
  createCanvas(800, 800)
//Dynamically draw array size based on resolution
  cols = width / res;
  rows = height / res;

  grid = make2DArray(cols,rows)
//Populate array with random binary
  for(let i=0; i < cols; i++) {
    for(let j=0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random()*2);
    }
  }

}

function draw() {
background(0)

//Draw rectangles
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) { 
      let x = i * res;
      let y = j * res;

      if (grid[i][j] == 1) {
        fill(255);
        stroke(255)
        rect(x, y, res, res)
      }
    }
  }

//Create a Next state of the grid
let next = make2DArray(cols,rows);

//Compute next grid state based on previous state
for(let i = 0; i < cols; i++) {
  for(let j = 0; j < rows; j++) {
    //Store position life
    let state = grid[i][j];

      //Count live neighbours
      let neighbours = countNeighbours(grid, i, j);

      //Automata Rules

      if(state==0 && neighbours == 3) {
        next[i][j] = 1;
      } else if (state==1 && (neighbours < 2 || neighbours > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
  }
}

//Update grid
grid = next;

}

//Count neighbours alive
function countNeighbours(grid, x, y) {
  let sum = 0;
  for(let i = -1; i < 2; i++) {
    for(let j = -1; j < 2; j++) {

      let col = (x+i+cols)%cols;
      let row = (y+j+rows)%rows;
      sum += grid[col][row]
    }
  }
  //Do not count current position in grid
  sum -= grid[x][y];
  return sum;
}