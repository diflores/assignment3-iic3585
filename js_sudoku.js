const findEmptyCell = (board, currentPosition) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == 0) {
        currentPosition[0] = i;
        currentPosition[1] = j;
        return true;
      }
    }
  }
  return false;
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
