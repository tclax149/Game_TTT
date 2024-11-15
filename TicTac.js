// TicTac.js

// Function to check if there's a winner
export function checkWinner(board) {
    if (!board || !Array.isArray(board)) return null;  // Add a guard for invalid or empty board
  
    // Check for horizontal, vertical, and diagonal winners
    for (let i = 0; i < 3; i++) {
      // Check rows
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];  // Return the winner (X or O)
      }
      // Check columns
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];  // Return the winner (X or O)
      }
    }
    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];  // Return the winner (X or O)
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];  // Return the winner (X or O)
    }
  
    return null;  // No winner
  }
  
  // Function to make a move on the board
  export function makeMove(board, row, col, player) {
    if (board[row][col] !== null) {
      return board;  // If the square is already filled, return the board unchanged
    }
  
    // Create a new board to avoid mutating the original one
    const newBoard = board.map((rowArr, rowIndex) => {
      if (rowIndex === row) {
        const newRow = [...rowArr];  // Create a new row array for immutability
        newRow[col] = player;  // Place the player's move in the row
        return newRow;
      }
      return rowArr;  // Return unchanged rows
    });
  
    return newBoard;  // Return the updated board
  }
  