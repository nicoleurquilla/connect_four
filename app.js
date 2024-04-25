var dialog = document.querySelector('dialog'); 

document.querySelector('#rules-btn').onclick = function() { 
    dialog.show(); 
};
document.querySelector('#close').onclick = function() { 
    dialog.close(); 
};
var buttons = document.getElementsByClassName("btn");
var reset = document.getElementById("reset-btn");
let gridEl = document.getElementById("grid")
var playerType = document.getElementById("player-type");
var winnerMsg = document.getElementById("winner-msg");
// Game Flow Variables
var playerNumber; // Initially player - 1 gets to start his/her turn
var filledGrid; // Player board
let winner;
const lookup = {
    "1": "#284B63",
    "-1": "#3c6e71",
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
    playerNumber = 1;
    render();
}

function handleClick(event) {
    const row = event.target.id[1]
    console.log(event.target.id)
    const index = filledGrid[row].indexOf(0);
    if (index === -1) return 
    filledGrid[row][index] = playerNumber
    playerNumber *= -1 
    winner = checkWinner([row][index])//pass row and index number into row 44
    render()
}

function checkWinner() {
    // Check for a horizontal win
    for (var i = 0; i < filledGrid.length; i++) {
        for (var j = 0; j < filledGrid[i].length - 3; j++) {
            if (filledGrid[i][j] !== 0 &&
                filledGrid[i][j] === filledGrid[i][j + 1] &&
                filledGrid[i][j] === filledGrid[i][j + 2] &&
                filledGrid[i][j] === filledGrid[i][j + 3]) {
                return true;
            }
        }
    }

    // Check for a vertical win
    for (var j = 0; j < filledGrid[0].length; j++) {
        for (var i = 0; i < filledGrid.length - 3; i++) {
            if (filledGrid[i][j] !== 0 &&
                filledGrid[i][j] === filledGrid[i + 1][j] &&
                filledGrid[i][j] === filledGrid[i + 2][j] &&
                filledGrid[i][j] === filledGrid[i + 3][j]) {
                return true;
            }
        }
    }

    // Check for a diagonal win (top-left to bottom-right)
    for (var i = 0; i < filledGrid.length - 3; i++) {
        for (var j = 0; j < filledGrid[i].length - 3; j++) {
            if (filledGrid[i][j] !== 0 &&
                filledGrid[i][j] === filledGrid[i + 1][j + 1] &&
                filledGrid[i][j] === filledGrid[i + 2][j + 2] &&
                filledGrid[i][j] === filledGrid[i + 3][j + 3]) {
                return true;
            }
        }
    }

    // Check for a diagonal win (top-right to bottom-left)
    for (var i = 0; i < filledGrid.length - 3; i++) {
        for (var j = 3; j < filledGrid[i].length; j++) {
            if (filledGrid[i][j] !== 0 &&
                filledGrid[i][j] === filledGrid[i + 1][j - 1] &&
                filledGrid[i][j] === filledGrid[i + 2][j - 2] &&
                filledGrid[i][j] === filledGrid[i + 3][j - 3]) {
                return true;
            }
        }
    }

    // Return false if no winning condition is detected
    return false;
}

function checkTie() {
    // Check if the board is full (no empty cells)
    for (var i = 0; i < filledGrid.length; i++) {
        for (var j = 0; j < filledGrid[i].length; j++) {
            if (filledGrid[i][j] === 0) {
                // Found an empty cell, game is not a tie yet
                return false;
            }
        }
    }
    // If no empty cells found, it's a tie
    return true;
}
//return null;



// Render the game board
function render() {
    // Iterate through the filledGrid array
    for (var i = 0; i < filledGrid.length; i++) {
        // Iterate through each column in the current row
        for (var j = 0; j < filledGrid[i].length; j++) {
            // Get the button element based on the current row and column indices
            var buttonId = "r" + i + "c" + j;
            var button = document.getElementById(buttonId);
            button.style.backgroundColor= `${lookup[filledGrid[i][j]]}`
        }
    }
    if (winner === "win") {
        winnerMsg.textContent = "Player " + playerNumber + " wins!";
        winnerMsg.style.display = "block";
    }

    if (winner === "tie") {
        tieMsg.textContent = "It's a tie!";
        tieMsg.style.display = "block";
    }

}   

function showPlayAgainButton() {
    var playAgainButton = document.getElementById("play-again-btn");
    playAgainButton.style.display = "block";
}

function resetGame() {
    // Hide the winning or tie message
    winnerMsg.style.display = "none";

    // Reset the filledGrid array
    filledGrid = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    // Reset playerNumber to 1
    playerNumber = 1;

    // Render the game board
    render();

    // Enable buttons for the next game
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }

    // Update player type display
    updatePlayerType();
}

// Event listener for the "Play Again" button
var reset = document.getElementById("reset-btn");
reset.addEventListener("click", resetGame);
  
