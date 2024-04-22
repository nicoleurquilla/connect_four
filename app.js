
//Constants
const ROWS = 6;
const COLS = 7;

//Variables
let currentPlayer = 1; //1 for red, 2 for yellow (player 1 starts)
let board = []; //this is my game board variable

//Functions

//create a function to create my game board
function createBoard() {
    const boardElement = document.getElementById('board');
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => dropDisc(col));
            board[row][col] = 0;
            boardElement.appendChild(cell);
        }
    }
}

//event listener for the board
function dropDiscEventListener() {
    //Add event listeners to each cell of the board
    // When a cell is clicked, dropDisc function is called
}

//handle a user clicking on the board
function handleCellClick(col) {
    // Check if the column or row is full
    // If not, drop the piece into the column
    // Check for a winner
    // Switch player
}

//check if there is a winner
function checkWin() {
    // Check horizontally, vertically, and diagonally for a winner
}

//have a reset function
function resetGame() {
    
}

function renderBoard() {
    // Render the current state of the board to the screen
    // Update the DOM to reflect the current state of the game
}

//initializeGame
function initializeGame () {

}

createBoard();