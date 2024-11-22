let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
let currentPlayer = 'X';

// Initialize the board UI and game state
document.querySelectorAll('.game-square').forEach((square, index) => {
  square.addEventListener('click', () => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Make the move on the board
    board = makeMove(board, row, col, currentPlayer);

    // Re-render the board UI
    renderBoard(board);

    // Check for a winner after the move
    const winner = checkWinner(board);

    if (winner) {
      renderBoard(board);  // Ensure board is rendered with the winner
      setTimeout(() => {  // Delay alert to allow UI update
        alert(`${winner} wins!`);
      }, 100); // Small delay
    } else {
      // Switch the player for the next move
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

// Render the game board to the UI
function renderBoard(board) {
  const squares = document.querySelectorAll('.game-square');
  squares.forEach((square, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    square.textContent = board[row][col] || '';  // Display X, O, or blank
  });
}

// Check if there’s a winner on the board

export function checkWinner(board) {
  // Check rows, columns, and diagonals for a winner
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]]
  ];

  // Check if any line has a winner
  for (let line of lines) {
    if (line[0] && line[0] === line[1] && line[0] === line[2]) {
      return line[0]; // Return the winner (either 'X' or 'O')
    }
  }

  // Check if the board is full
  const isFull = board.every(row => row.every(cell => cell !== null));

  // If board is full and no winner, return 'Draw'
  if (isFull) {
    return 'Draw';
  }

  // No winner and board is not full
  return null;
}



// Function to make a move on the board
export function makeMove(board, row, col, player) {
  if (board[row][col] !== null) {
    console.log('Square is already occupied.');
    return board;  // Return board unchanged if square is occupied
  }
  const newBoard = board.map((rowArr, rowIndex) => {
    if (rowIndex === row) {
      const newRow = [...rowArr];
      newRow[col] = player;
      return newRow;
    }
    return rowArr;
  });
  return newBoard;
}

// Ensure the restart button event listener is added after DOM content is loaded
window.onload = () => {
  const restartButton = document.getElementById('restart-button');
  if (restartButton) {
    restartButton.addEventListener('click', () => {
      // Reset the board and UI for a new game
      board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
      currentPlayer = 'X';  // Reset to player X starting
      renderBoard(board);  // Re-render the empty board
    });
  }
};
