var buttons = document.getElementsByClassName("btn");
var reset = document.getElementById("reset-btn");
var playerType = document.getElementById("player-type");

// Game Flow Variables
var playerNumber; // Initially player - 1 gets to start his/her turn
var filledGrid; // Player board
let row;
let col;

// Event Listeners
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

// Render the game board
function render() {
    // Iterate through the filledGrid array
    for (var i = 0; i < filledGrid.length; i++) {
        // Iterate through each column in the current row
        for (var j = 0; j < filledGrid[i].length; j++) {
            // Get the button element based on the current row and column indices
            var buttonId = "r" + i + "c" + j;
            var button = document.getElementById(buttonId);

            if (button) {
                // Clear the existing classes from the button
                button.className = "btn";

                // Add the appropriate player class to the button based on the value in filledGrid
                if (filledGrid[i][j] === 1) {
                    button.classList.add("player-1");
                } else if (filledGrid[i][j] === 2) {
                    button.classList.add("player-2");
                }
            }
        }
    }
}

    // Get the button element that was clicked
  

    // Change the background color of the clicked button based on the current player
    var player1 = {
        styles: {
            backgroundColor: "#284B63"
        }
    };
    var player2 = {
        styles: {
            backgroundColor: "#3c6e71"
        }
    };

    var playerNumber = 1; // Assuming playerNumber is defined somewhere in the code
    
    // Call a function to handle the player's move
    function handleMove(row, column) {
        filledGrid[row][column] = playerNumber;
        render();

        var buttonId = "r" + row + "c" + column;
        var button = document.getElementById(buttonId);
        
    if (playerNumber === 1) {
        var buttonElement = document.getElementById("button");
        if (buttonElement) {
            buttonElement.style.backgroundColor = player1.styles.backgroundColor;
        }
    } else {
        var buttonElement = document.getElementById("button");
        if (buttonElement) {
            buttonElement.style.backgroundColor = player2.styles.backgroundColor;
        }
    }
}

    // Check for win or tie after each move
    if (checkWin()) {
        var winnerMsg = document.getElementById("winner-msg");
        winnerMsg.textContent = "Player " + playerNumber + " wins!";
        winnerMsg.style.display = "block";
        disableButtons(); // Disable further moves
    } else if (checkTie()) {
        var tieMsg = document.getElementById("winner-msg");
        tieMsg.textContent = "It's a tie!";
        tieMsg.style.display = "block";
        disableButtons(); // Disable further moves
    } else {
        // Switch turns between players
        playerNumber = playerNumber === 1 ? 2 : 1;
        updatePlayerType();
    }


// Iterate through the buttons array and add click event listeners to each button
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(event) {
        // Parse the row and column indices from the button id
        var buttonId = event.target.id;
        var row = parseInt(buttonId.charAt(1));
        var column = parseInt(buttonId.charAt(3));
        // Check if the clicked column is not full
        if (filledGrid[0][column] === 0) {
            // Find the lowest empty row in the clicked column
            var lowestEmptyRow = findLowestEmptyRow(column);
            if (lowestEmptyRow !== -1) {
                // Call handleMove function with row and column indices
                handleMove(lowestEmptyRow, column);
            } else {
                // Display a message or perform any other action to indicate that the column is full
                alert("This column is full! Please choose another column.");
            }
        } else {
            // Display a message or perform any other action to indicate that the column is full
            alert("This column is full! Please choose another column.");
        }
    });
}