import R from './ramda.js';
import FindtheAirplane from './FindtheAirplane.js';
import GameState from './GameState.js'; 

const gridSize = 10;

document.getElementById('ready-button1').addEventListener('click', () => FindtheAirplane.startGame(0, displayGrid));
document.getElementById('ready-button2').addEventListener('click', () => FindtheAirplane.startGame(1, displayGrid));


function displayGrid(player) {
    console.log(`Displaying grid for player ${player}:`, GameState.grids[player]);
    const gridContainer = document.getElementById(`player${player + 1}-grid`);
    if (!gridContainer) {
      console.error(`Cannot find grid container for player ${player}`);
      return;
    }
    console.log(`Found grid container for player ${player}`);  
    gridContainer.innerHTML = '';

    const grid = GameState.grids[player];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.style.backgroundColor = 'white'; // Set initial color to white
            cell.addEventListener('click', function (e) {
                cellClicked(player, e.target);
            });
            gridContainer.appendChild(cell);
        }
    }
    console.log(`Finished displaying grid for player ${player}`);  
}




function cellClicked(player, cell) {
    var i = parseInt(cell.dataset.row);
    var j = parseInt(cell.dataset.col);
    if (player !== GameState.currentPlayer) {
        // It's not this player's turn, do nothing
        return;
    }

    // Check if cell contains a plane head or body, and handle the game logic.
    if (GameState.grids[player][i][j] === 1) {
        console.log(GameState.grids);
        console.log("Player " + (player+1) + " found a plane head at " + i + ", " + j);
        cell.style.backgroundColor = 'red';
        GameState.planeHeadsFound[player]++;   // Increment the count of plane heads found

        // Check if the player has found all the planes
        if (GameState.planeHeadsFound[player] >= FindtheAirplane.planes) {
            console.log(`Player ${player+1} has found ${GameState.planeHeadsFound[player]} plane heads.`);
            console.log(`Number of plane heads needed to win: ${FindtheAirplane.planes}`);
            // Update the win message
            document.getElementById('win-message').textContent = "Player " + (player+1) + " wins! Click 'Play Again' to start a new game.";
            
            // Show the overlay and play again button
            document.getElementById('win-overlay').classList.remove('hidden');
            document.getElementById('play-again-button').classList.remove('hidden');
        }
    } else if (GameState.grids[player][i][j] === 2) {
        console.log("Player " + (player+1) + " found a plane body at " + i + ", " + j);
        cell.style.backgroundColor = 'blue';
    } else {
        console.log("Player " + (player+1) + " missed at " + i + ", " + j);
        cell.style.backgroundColor = 'grey';
    }
    GameState.currentPlayer = 1 - GameState.currentPlayer;
}

document.getElementById('player1-ready').addEventListener('click', function() {
    console.log(GameState.gameRunning);
    if (!GameState.gameRunning) {
        console.log("Player 1 ready button clicked");
        GameState.gameRunning = true;
        const player = 0;
        FindtheAirplane.startGame(player, displayGrid);
        
    }
});

document.getElementById('player2-ready').addEventListener('click', function() {
    console.log("Player 2 ready button clicked");
    if (!GameState.gameRunning) {
        GameState.gameRunning = true;
        const player = 1;
        FindtheAirplane.startGame(player, displayGrid);    
            
    }
});

document.getElementById('overlay-close').addEventListener('click', function() {
    document.getElementById('win-overlay').classList.add('hidden');
});

document.getElementById('play-again-button').addEventListener('click', () => {
    FindtheAirplane.resetGame(displayGrid);
});

if (GameState.planeHeadsFound[GameState.currentPlayer] >= FindtheAirplane.planes) {
    document.getElementById('win-message').textContent = "Player " + (GameState.currentPlayer+1) + " wins! Click 'Play Again' to start a new game.";
    document.getElementById('play-again-button').classList.remove('hidden');
}
