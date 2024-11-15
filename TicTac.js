/*

what data do i need to keep track of?
- player 1 and  player 2
- whose turn it is 
- gamesquare is disabled 
- if there is a winner 
    - horizontal 
    - diagnol
    - vertical  

what data do i need to manipulate?
- dynamic heading for players turn 
- change & disable gamesquares based on players selection, 
- gamesquares based on winner or tie


Breaking Down Solution
    1.  when gamesquare is clicked show x or an o depending on player, update h2 to say whose turn it is
    2. determine when the game ends, if clicking on square causes player to win game 
    3. end game phase, show restart button, if restart button is clicked on reset the board

    
*/


    
  // Function to initialize the Tic-Tac-Toe board
// Initialize the board as a 3x3 grid
const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// Define winning combinations (rows, columns, and diagonals)
const lines = [
    [[0, 0], [0, 1], [0, 2]],  // First row
    [[1, 0], [1, 1], [1, 2]],  // Second row
    [[2, 0], [2, 1], [2, 2]],  // Third row
    [[0, 0], [1, 0], [2, 0]],  // First column
    [[0, 1], [1, 1], [2, 1]],  // Second column
    [[0, 2], [1, 2], [2, 2]],  // Third column
    [[0, 0], [1, 1], [2, 2]],  // First diagonal
    [[0, 2], [1, 1], [2, 0]]   // Second diagonal
];

// Function to check if there is a winner
function checkWinner(board) {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
  
    return null; // No winner
  }

// Function to make a move
function makeMove(board, row, col, player) {
    if (board[row][col] === null) {
      const newBoard = [...board.map(row => [...row])];  // Create a copy of the board
      newBoard[row][col] = player;
      return newBoard;
    }
    return board;  // Return the unchanged board if the spot is already filled
  }
  

// Example of how the game might proceed
makeMove(board, 0, 0, 'X');
makeMove(board, 1, 1, 'O');
makeMove(board, 2, 2, 'X');

// Checking for a winner after moves
console.log(checkWinner(board)); // Will log `true` if a winner is found

module.exports = { checkWinner, makeMove, board };
