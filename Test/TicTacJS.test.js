import { checkWinner, makeMove } from '../TicTac.js';  // Importing game logic functions

let boardState;
beforeEach(() => {
    boardState = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
    document.body.innerHTML = `
      <h1 id="game-heading"></h1>
      <button id="restart-button"></button>
      <div class="game-square"></div>
      <div class="game-square"></div>
      <div class="game-square"></div>
    `;
});

describe('Tic Tac Toe Logic Tests', () => {

  // Test for checkWinner function
  test('checkWinner returns null if there is no winner', () => {
    const board = [
      ['X', 'O', 'X'],
      ['X', 'O', null],
      [null, null, 'X']
    ];
    const result = checkWinner(board);  // No winner yet
    expect(result).toBe(null);
  });

  test('checkWinner should return correct winner', () => {
    const winningBoard = [
      ['X', 'X', 'X'],
      ['O', 'O', null],
      [null, null, 'O']
    ];
    const winner = checkWinner(winningBoard);
    expect(winner).toBe('X');  // Check that X wins
  });


  test('checkWinner returns null if board is full and no winner', () => {
    const board = [
      ['X', 'O', 'X'],
      ['X', 'X', 'O'],
      ['O', 'X', 'O']
    ];
    const result = checkWinner(board);  // Full board with no winner
    expect(result).toBe(null);
  });

  // Test for makeMove function
  test('makeMove updates the board correctly with X', () => {
    const newBoard = makeMove(boardState, 0, 0, 'X');  // Make move at 0, 0
    expect(newBoard[0][0]).toBe('X');  // Ensure the board is updated correctly
  });


  test('makeMove updates the board correctly with O', () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    const newBoard = makeMove(board, 1, 1, 'O');  // Make move at 1, 1
    expect(newBoard[1][1]).toBe('O');  // Ensure the board is updated correctly
    expect(newBoard[0][0]).toBe(null);  // Ensure other positions are unaffected
  });

  test('makeMove does not update already filled positions', () => {
    const board = [
      ['X', null, null],
      [null, null, null],
      [null, null, null]
    ];
    const newBoard = makeMove(board, 0, 0, 'O');  // Attempt to overwrite an X
    expect(newBoard[0][0]).toBe('X');  // Ensure the original move is not overwritten
  });

  // Edge case: makeMove should not alter the board if the square is already occupied
  test('makeMove should not alter the board when the square is occupied', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['X', 'O', 'X']
    ];
    const newBoard = makeMove(board, 0, 0, 'O');  // Attempt to overwrite 'X'
    expect(newBoard[0][0]).toBe('X');  // Ensure no change is made
  });

});
