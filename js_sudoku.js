const findEmptyCell = (board, currentPosition) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        currentPosition[0] = row;
        currentPosition[1] = col;
        return true;
      }
    }
  }
  return false;
};

const usedInRow = (board, row, number) => {
  for (let col = 0; col < 9; col++) {
    if (board[row][col] === number) {
      return true;
    }
  }
  return false;
};

const usedInCol = (board, col, number) => {
  for (let row = 0; row < 9; row++) {
    if (board[row][col] === number) {
      return true;
    }
  }
  return false;
};

const usedIn3x3 = (board, row, col, number) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + row][j + col] == number) {
        return true;
      }
    }
  }
  return false;
};

const isValidNumber = (board, row, col, number) => {
  return (board[row][col] === 0 && !usedIn3x3(board, row - row % 3, col - col % 3, number) && !usedInRow(board, row, number) && !usedInCol(board, col, number));
};

const isSolved = (board) => {
  const position = [0, 0]
  if (!findEmptyCell(board, position)) {
    return true;
  }
  for (let value = 1; value < 10; value++) {
    const row = position[0];
    const col = position[1];
    if (isValidNumber(board, row, col, value)) {
      board[row][col] = value;
      if (isSolved(board)) {
        return true;
      }
      board[row][col] = 0;
    }
  }
  return false;
}

const solveSudoku = (board) => {
  isSolved(board);
  flatBoard = Array(81);
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++){
      flatBoard[9 * row + col] = board[row][col];
    }
  }
  return flatBoard;
};

const solve = () => {
  const flattenSudoku = [];
  [...Array(81).keys()].map(i => {
    const value = parseInt(document.getElementById(`cell-${i}`).value);
    value ? flattenSudoku.push(value) : flattenSudoku.push(0);
  });
  const matrixSudoku = [];
  for (let row = 0; row < 9; row++) {
    matrixSudoku.push(Array(9));
  }
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++){
      matrixSudoku[row][col] = flattenSudoku[9 * row + col];
    }
  }
  const resultArray = solveSudoku(matrixSudoku);
  [...Array(81).keys()].map(i => {
    if (flattenSudoku[i] === 0) {
      document.getElementById(`cell-${i}`).classList.add("filled");
    }
    document.getElementById(`cell-${i}`).value = resultArray[i];
    document.getElementById(`cell-${i}`).disabled = true;
  });
};

const clearGrid = () => {
  [...document.getElementsByTagName("input")].forEach(element => {
    element.value = "";
    element.disabled = false;
    element.classList.remove("filled");
  });
};
