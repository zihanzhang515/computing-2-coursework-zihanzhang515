import { assert } from 'chai';
import FindtheAirplane from '../FindtheAirplane.js';
import GameState  from '../GameState.js'; 
import sinon from 'sinon';

describe('Find the Airplane', function() {
  let gridSize;
  let planes;
  let grids;
  let gameRunning;
  let planeHeadsFound;
  let currentPlayer;

  beforeEach(function() {
    // Reset game state before each test
    gridSize = 10;
    planes = 3;
    grids = [[], []];
    gameRunning = false;
    planeHeadsFound = [0, 0];
    currentPlayer = 0;
  });

  describe('displayGrid', function() {
    it('should update the grid container with cells', function() {
      if (typeof document !== 'undefined') {
        // Mock the grid container
        const gridContainer = document.createElement('div');
        gridContainer.id = 'player1-grid';
        document.body.appendChild(gridContainer);
  
        displayGrid(0);
  
        assert.include(gridContainer.innerHTML, '<div class="cell"');
      }
    });
  });

  describe('canPlacePlane', function() {
    it('should return true if the plane shape can be placed at the given coordinates', function() {
      const grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
      const planeShape = [
        [0, 2, 0, 0, 0],
        [0, 2, 0, 2, 0],
        [1, 2, 2, 2, 0],
        [0, 2, 0, 2, 0],
        [0, 2, 0, 0, 0]
      ];
      const canPlace = FindtheAirplane.canPlacePlane(grid, planeShape, 3, 3);
      assert.isTrue(canPlace);
    });
  });

  describe('rotatePlaneShape', function() {
    it('should rotate the plane shape clockwise by 90 degrees', function() {
      const planeShape = [
        [0, 0, 1, 0, 0],
        [0, 2, 2, 2, 0],
        [2, 0, 2, 0, 2],
        [0, 0, 2, 0, 0],
        [0, 2, 2, 2, 0]
      ];
      const rotatedShape = FindtheAirplane.rotatePlaneShape(planeShape);
      assert.deepEqual(rotatedShape, [
        [0, 0, 2, 0, 0],
        [2, 0, 0, 2, 0],
        [2, 2, 2, 2, 1],
        [2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0]
      ]);
    });
  });

  describe('cellClicked', function() {
    it('should handle a cell click by updating the game state', function() {
      if (typeof document !== 'undefined') {
      const cell = document.createElement('div');
      cell.dataset.row = '3';
      cell.dataset.col = '3';

      grids = [
        [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
      ];
      currentPlayer = 0;

      cellClicked(0, cell);

      assert.equal(grids[0][3][3], 3); // Assuming 3 is the value indicating the plane head has been found
      }
    });
  });

  describe('resetGame', function() {
    it('should reset the game state', function() {
      if (typeof window !== 'undefined'){
      sinon.stub(window, 'startGame');

      resetGame();

      assert.isFalse(gameRunning);
      assert.equal(currentPlayer, 0);
      assert.deepEqual(planeHeadsFound, [0, 0]);
      assert.deepEqual(grids, [[], []]);
      assert.calledTwice(startGame);
      assert.calledWith(startGame, 0);
      assert.calledWith(startGame, 1);
      }
    });
  });
});


