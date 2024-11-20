import { checkWinner, makeMove } from '../TicTac.js';
import fs from 'fs';
import { beforeEach } from 'node:test';
import path from 'path';

beforeAll(() => {
  // Set up the DOM structure for each test
  document.body.innerHTML = `
  <div id="board">
    <button id="restart-button">Restart Game</button>
    <button class="game-square"></button>
    <button class="game-square"></button>
    <button class="game-square"></button>
    <button class="game-square"></button>
    <button class="game-square"></button>
    <button class="game-square"></button>
    <button class="game-square"></button>
    <button class="game-square"></button>
    <button class="game-square"></button>
  </div>
`;
  const restartButton = document.getElementById('restart-button');
});


afterAll(() => {
  const restartButton = document.getElementById('restart-button');
  if (restartButton) {
    restartButton.addEventListener('click', () => {
      board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
      currentPlayer = 'X';  // Reset to player X starting
      renderBoard(board);  // Re-render the empty board
      console.log('Game restarted.');
    });
  }
});

describe('TicTacToe Logic Tests', () => {
  test('checkWinner returns null if there is no winner and the board is not full', () => {
    const board = [
      ['X', null, 'O'],
      [null, 'X', 'O'],
      ['X', 'O', null]
    ];
    expect(checkWinner(board)).toBe(null); // No winner and not full
  });


  test('checkWinner returns Draw if the board is full but no winner', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O']
    ];
    expect(checkWinner(board)).toBe('Draw');  // All squares filled with no winner
  });


  test('checkWinner should return correct winner', () => {
    const board = [
      ['X', 'X', 'X'],
      ['O', 'O', null],
      [null, null, null]
    ];
    expect(checkWinner(board)).toBe('X');
  });

  test('makeMove should update the board correctly with X', () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    const newBoard = makeMove(board, 0, 0, 'X');
    expect(newBoard[0][0]).toBe('X');
    expect(newBoard).not.toEqual(board); // Ensure the board has changed
  });

  test('makeMove updates board correctly with O', () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    const newBoard = makeMove(board, 1, 1, 'O');
    expect(newBoard[1][1]).toBe('O');
    expect(newBoard).not.toEqual(board); // Ensure the board has changed
  });

  test('Event listener for the restart button', () => {
    // Set up the DOM
    document.body.innerHTML = `
        <div id="board">
            <button id="restart-button">Restart Game</button>
            <!-- other buttons for the squares -->
        </div>
    `;

    const restartButton = document.getElementById('restart-button');

    // Check if the restart button exists
    expect(restartButton).toBeDefined();

    // Initialize the board as a global variable
    let board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    // Add event listener for the restart button
    restartButton.addEventListener('click', () => {
      board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
      console.log('Game restarted');
    });

    // Simulate a click
    restartButton.click();

    // Verify that the board has been reset
    expect(board).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  });


});
