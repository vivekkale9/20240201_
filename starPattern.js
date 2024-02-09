/* We have to create a grid of height 30 and width 50.
 * The grid should generate an asterisk at any random position and other
 * spaces should be empty.
 * This asterisk should move in one of the 9 possible directions but just by 1
 * step each time.
 * Also the asterisk should not go out of the grid
 * Alse we have to refresh the screen and make the star move at the same time
 */

//The width of the grid
const gridWidth = 50;

// The height of the grid
const gridHeight = 30;

/** A function to generate a random position
 * @param {number} X - The x co-ordinate of the position.
 * @param {number} Y - The y co-ordinate of the position.
 * @return {number} A random number between x and y.
 */
function randomPosition(X, Y) {
  return Math.floor(Math.random() * (Y - X + 1)) + X;
}

let Xcoord = randomPosition(1, gridWidth);
let Ycoord = randomPosition(1, gridHeight);

/** A function to pause the display
 * @param {Number} milisec - The number of milliseconds to pause.
 * @return {Promise} promise after certain time interval.
 */
function pause(milisec) {
  return new Promise(resolve => setTimeout(resolve, milisec));
}

//A function to move the asterisk to a random position within the box.
async function shift() {
    while (true) {
      const direction = Math.random() < 0.5 ? -1 : 1;
      const axis = Math.random() < 0.5 ? 'x' : 'y';
  
      Xcoord += axis === 'x' ? direction : 0;
      Ycoord += axis === 'y' ? direction : 0;
  
      Xcoord = Math.max(1, Math.min(Xcoord, gridWidth - 2));
      Ycoord = Math.max(1, Math.min(Ycoord, gridHeight - 2));
  
      createGrid();
      await pause(200);
    }
  }

// A function to draw the grid
function createGrid() {
  console.clear();

  for (let row = 0; row < gridHeight; row++) {
    let line = '';

    for (let col = 0; col < gridWidth; col++) {
      if ((row === 0 || row === gridHeight - 1) 
      && (col === 0 || col === gridWidth - 1)) {
        line += '+';
      } else if (row === 0 || row === gridHeight - 1) {
        line += '_';
      } else if (col === 0 || col === gridWidth - 1) {
        line += '|';
      } else {
        line += (row === Ycoord && col === Xcoord) ? '*' : ' ';
      }
    }

    console.log(line);
  }
}

shift();