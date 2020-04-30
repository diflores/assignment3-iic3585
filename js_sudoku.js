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

const solveSudoku = (flattenSudoku) => {
  return flattenSudoku;
};

const solve = () => {
  const flattenSudoku = [];
  [...Array(81).keys()].map(i => {
    const value = parseInt(document.getElementById(`cell-${i}`).value);
    value ? flattenSudoku.push(value) : flattenSudoku.push(0);
  });
  const resultArray = solveSudoku(flattenSudoku);
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
