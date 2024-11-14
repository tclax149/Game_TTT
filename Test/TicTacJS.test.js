import { checkWinner, makeMove } from '../TicTac.js';  // Importing game logic functions

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

  test('checkWinner returns the correct winner', () => {
    const board1 = [
      ['O', 'O', 'O'],
      ['X', 'X', null],
      [null, null, 'X']
    ];
    const board2 = [
      ['X', 'X', 'X'],
      ['O', 'O', null],
      [null, null, 'O']
    ];

    expect(checkWinner(board1)).toBe('O');  // O wins
    expect(checkWinner(board2)).toBe('X');  // X wins
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
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    const newBoard = makeMove(board, 0, 0, 'X');  // Make move at 0, 0
    expect(newBoard[0][0]).toBe('X');  // Ensure the board is updated correctly
    expect(newBoard[1][1]).toBe(null);  // Ensure other positions are unaffected
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

});
