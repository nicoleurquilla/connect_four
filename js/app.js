var dialog = document.querySelector('dialog');

document.querySelector('#rules-btn').onclick = function() {
    dialog.show();
};
document.querySelector('#close').onclick = function() {
    dialog.close();
};
var buttons = document.getElementsByClassName("btn");
var reset = document.getElementById("reset-btn");
let gridEl = document.getElementById("grid");
var playerMsg = document.getElementById("playerMsg");
var winnerMsg = document.getElementById("winnerMsg");


// Game Flow Variables
var playerNumber; // Initially player - 1 gets to start his/her turn
var filledGrid;  // Player board
let winner;
const lookup = {
    "1": "#B0D4D6",
    "-1": "#447E81",
    "0": "#d9d9d9",
}

// Event Listeners
gridEl.addEventListener("click", handleClick);
reset.addEventListener("click", init);

init();
function init() {
    filledGrid = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];
    playerNumber = -1; // Changed to -1
    winner = null;
    render();
}

function handleClick(event) {
    if(winner) return
    const row = event.target.id[1];
    const index = filledGrid[row].indexOf(0);
    if (index === -1) return;
    filledGrid[row][index] = playerNumber;
    winner = checkWinner(row, index);
    playerNumber *= -1; // Switch player turn here
    render();
  }

function checkWinner(row, col) {
    // Check horizontal win
    for (let i = 0; i < filledGrid.length; i++) {
        for (let j = 0; j < filledGrid[i].length - 3; j++) {
            if (filledGrid[i][j] !== 0 &&
                filledGrid[i][j] === filledGrid[i][j + 1] &&
                filledGrid[i][j] === filledGrid[i][j + 2] &&
                filledGrid[i][j] === filledGrid[i][j + 3]) {
                return "win"
            }
        }
    }

    // Check vertical win
    for (let i = 0; i < filledGrid.length - 3; i++) {
        if (filledGrid[i][col] !== 0 &&
            filledGrid[i][col] === filledGrid[i + 1][col] &&
            filledGrid[i][col] === filledGrid[i + 2][col] &&
            filledGrid[i][col] === filledGrid[i + 3][col]) {
            return "win"
        }
    }

    // Check diagonal win (top-left to bottom-right)
    for (let i = 0; i < filledGrid.length - 3; i++) {
        for (let j = 0; j < filledGrid[i].length - 3; j++) {
            if (filledGrid[i][j] !== 0 &&
                filledGrid[i][j] === filledGrid[i + 1][j + 1] &&
                filledGrid[i][j] === filledGrid[i + 2][j + 2] &&
                filledGrid[i][j] === filledGrid[i + 3][j + 3]) {
                return "win"
            }
        }
    }

    // Check diagonal win (top-right to bottom-left)
    for (let i = 0; i < filledGrid.length - 3; i++) {
        for (let j = 3; j < filledGrid[i].length; j++) {
            if (filledGrid[i][j] !== 0 &&
                filledGrid[i][j] === filledGrid[i + 1][j - 1] &&
                filledGrid[i][j] === filledGrid[i + 2][j - 2] &&
                filledGrid[i][j] === filledGrid[i + 3][j - 3]) {
                return "win"
            }
        }
    }

    if (checkTie()) return "tie"
    // No win condition is found
    return false;
}

function checkTie() {
    // Check if the board is full (no empty cells)
    for (let i = 0; i < filledGrid.length; i++) {
        for (let j = 0; j < filledGrid[i].length; j++) {
            if (filledGrid[i][j] === 0) {
                // Found an empty cell, game is not a tie yet
                return false;
            }
        }
    }
    // If no empty cells found, it's a tie
    return true;
}

function render() {
    // Iterate through the filledGrid array
    for (var i = 0; i < filledGrid.length; i++) {
        // Iterate through each column in the current row
        for (var j = 0; j < filledGrid[i].length; j++) {
            // Get the button element based on the current row and column indices
            var buttonId = "r" + i + "c" + j;
            var button = document.getElementById(buttonId);
            button.style.backgroundColor = `${lookup[filledGrid[i][j]]}`;
        }
    }

    playerMsg.textContent = "Player " + (playerNumber === -1 ? 1 : 2) +"'s turn";


    // Display winner or tie message if applicable
    if (winner === "win") {
        winnerMsg.textContent = "Player " + (playerNumber === -1 ? 2 : 1) + " wins!"; // Adjusted to show correct player number
        winnerMsg.style.display = "block";
    }
    
    
    if (winner === "tie") {
        winnerMsg.textContent = "It's a tie!";
        winnerMsg.style.display = "block";
    } 
    
    if (!winner) {
        winnerMsg.style.display = "none"; // Hide winner message if no winner or tie
    }
}

function showPlayAgainButton() {
    var playAgainButton = document.getElementById("play-again-btn");
    playAgainButton.style.display = "block";
}


