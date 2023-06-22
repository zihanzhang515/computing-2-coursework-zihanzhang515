import GameState from './GameState.js';
/**
 * Connect4.js is a module to model and play "Connect Four" and related games.
 * https://en.wikipedia.org/wiki/Connect_Four
 * @namespace FindtheAirplane
 * @author Jennifer Zhang
 * @version 1.0.1
 */
const FindtheAirplane = Object.create(null);

const gridSize = 10;
const planes = 3;
const planeShapes = [
    [ // Plane shape 1
        [0, 0, 1, 0, 0],
        [2, 2, 2, 2, 2],
        [0, 0, 2, 0, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0]
    ],
    [ // Plane shape 2
        [0, 0, 1, 0, 0],
        [0, 2, 2, 2, 0],
        [2, 0, 2, 0, 2],
        [0, 0, 2, 0, 0],
        [0, 2, 2, 2, 0]
    ],
    [ // Plane shape 3
        [0, 0, 1, 0, 0],
        [0, 0, 2, 0, 0],
        [2, 2, 2, 2, 2],
        [0, 0, 2, 0, 0],
        [0, 2, 0, 2, 0]
    ]
];

/**
 * Checks if a plane can be placed on a given grid at a certain position.
 * @memberof FindtheAirplane
 * @function
 * @param {number[][]} grid The grid to place the plane on.
 * @param {number[][]} planeShape The shape of the plane to place.
 * @param {number} x The x position to place the plane.
 * @param {number} y The y position to place the plane.
 * @returns {boolean} Whether the plane can be placed or not.
 */
FindtheAirplane.canPlacePlane = function (grid, planeShape, x, y) {
    for (var i = 0; i < planeShape.length; i++) {
        for (var j = 0; j < planeShape[i].length; j++) {
            if (planeShape[i][j] !== 0 && (x+i >= gridSize || y+j >= gridSize || grid[x+i][y+j] !== 0)) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Rotates a plane shape 90 degrees clockwise.
 * @memberof FindtheAirplane
 * @function
 * @param {number[][]} planeShape The shape of the plane to rotate.
 * @returns {number[][]} The rotated plane shape.
 */
FindtheAirplane.rotatePlaneShape = function (planeShape) {
    const size = planeShape.length;
    const newShape = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            newShape[j][size - 1 - i] = planeShape[i][j];
        }
    }
    return newShape;
};

/**
 * Places a plane on a grid.
 * @memberof FindtheAirplane
 * @function
 * @param {number[][]} grid The grid to place the plane on.
 * @param {number[][]} planeShape The shape of the plane to place.
 */
FindtheAirplane.placePlane = function (grid, planeShape) {
    if (Math.random() > 0.5) {
        planeShape = FindtheAirplane.rotatePlaneShape(planeShape);
    }

    var x, y;
    do {
        x = Math.floor(Math.random() * (gridSize - planeShape.length + 1));
        y = Math.floor(Math.random() * (gridSize - planeShape[0].length + 1));
    } while (!FindtheAirplane.canPlacePlane(grid, planeShape, x, y));
    for (var i = 0; i < planeShape.length; i++) {
        for (var j = 0; j < planeShape[i].length; j++) {
            if (planeShape[i][j] !== 0) {
                grid[x+i][y+j] = planeShape[i][j];
            }
        }
    }
};

/**
 * Starts a new game for a player.
 * @memberof FindtheAirplane
 * @function
 * @param {number} player The player to start a game for.
 * @returns {number[][]} The new grid for the player.
 */
FindtheAirplane.startGame = function (player, displaygrid) {
    console.log(`Starting game for player: ${player}`);  
    if (!GameState.grids[player].length) { // Check if player's grid is empty
        GameState.grids[player] = Array(gridSize).fill().map(() => Array(gridSize).fill(0)); // Initialize player's grid
        for (var p = 0; p < planes; p++) {
            FindtheAirplane.placePlane(GameState.grids[player], planeShapes[p]);
        }
        console.log(`Calling callback for player ${player}`);  
        displaygrid(player);
    } else {
        console.log(`Grid already exists for player ${player}`); 
    }
    if (GameState.grids[0].length && GameState.grids[1].length) {
        GameState.gameRunning = true;
        console.log("Game is now running");  
    } else {
        console.log("Game is not yet running");  
    }
};



/**
 * Resets the game.
 * @memberof FindtheAirplane
 * @function
 * @returns {number[][][]} The reset grids for both players.
 */
FindtheAirplane.resetGame = function (callback) {
    GameState.currentPlayer = 0;
    GameState.planeHeadsFound = [0, 0];
    GameState.grids = [];
    for (let player = 0; player < 2; player++) {
        FindtheAirplane.startGame(player, callback);
    }
};



export default FindtheAirplane;
