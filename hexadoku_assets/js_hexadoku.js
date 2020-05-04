const hexaChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

const findEmptyCell = (board, currentPosition) => {
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      if (board[row][col] === '.') {
        currentPosition[0] = row;
        currentPosition[1] = col;
        return true;
      }
    }
  }
  return false;
};

const usedInRow = (board, row, number) => {
  for (let col = 0; col < 16; col++) {
    if (board[row][col] === number) {
      return true;
    }
  }
  return false;
};

const usedInCol = (board, col, number) => {
  for (let row = 0; row < 16; row++) {
    if (board[row][col] === number) {
      return true;
    }
  }
  return false;
};

const usedIn4x4 = (board, row, col, number) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i + row][j + col] === number) {
        return true;
      }
    }
  }
  return false;
};

const isValidNumber = (board, row, col, number) => {
  return (board[row][col] === '.' && !usedIn4x4(board, row - row % 4, col - col % 4, number) && !usedInRow(board, row, number) && !usedInCol(board, col, number));
};

const isSolved = (board) => {
  const position = [0, 0]
  if (!findEmptyCell(board, position)) {
    return true;
  }
  for (let value = 0; value < 16; value++) {
    const row = position[0];
    const col = position[1];
    if (isValidNumber(board, row, col, hexaChars[value])) {
      board[row][col] = hexaChars[value];
      if (isSolved(board)) {
        return true;
      }
      board[row][col] = '.';
    }
  }
  return false;
};

const solveSudoku = (board) => {
  isSolved(board);
  flatBoard = Array(256);
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++){
      flatBoard[16 * row + col] = board[row][col];
    }
  }
  return flatBoard;
};

const solve = () => {
  const startTime = performance.now();
  let flattenSudoku = [];
  [...Array(256).keys()].map(i => {
		const value = document.getElementById(`cell-${i}`).value;
    value ? flattenSudoku.push(value) : flattenSudoku.push('.');
	});
	flattenSudoku = flattenSudoku.map(
		(value) => Number.isInteger(value) ? value.toString() : value.toUpperCase()
	).join('');

	// este demora 17 segundos
	const easy = '2...1.....................................F..................................D........................................9..................A..................................8........................G.............................................5............';
	// este nunca termina
	const expert = '.5...D...A...6.F.3....B0.95...CD.1.7F49A..D...3.B.....5....7.8.......0A2.6..9....49.....F......B1E75..8D..9.0.....6.3...D8...2.4D....6..97.28.........2..E3........8A1.5.0.......6E.....5.....7...5B6........A.....0.....B.654.12A.9.7...41...0.87..5....2..ECB.';

	const matrixSudoku = [];
	const easySudoku = [];
	const expertSudoku = [];
  for (let row = 0; row < 16; row++) {
		matrixSudoku.push(Array(16));
		easySudoku.push(Array(16));
		expertSudoku.push(Array(16));
  }
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++){
			matrixSudoku[row][col] = flattenSudoku[16 * row + col];
			easySudoku[row][col] = easy[16 * row + col];
			expertSudoku[row][col] = expert[16 * row + col];
    }
  }
	const resultArray = solveSudoku(matrixSudoku);
	[...Array(256).keys()].map(i => {
    if (flattenSudoku[i] === '.') {
      document.getElementById(`cell-${i}`).classList.add("filled");
    }
    document.getElementById(`cell-${i}`).value = resultArray[i];
    document.getElementById(`cell-${i}`).disabled = true;
  });
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  const solvingTimePre = "Solving time using JS: &nbsp";
  const solvingTimeText = `${totalTime/1000} seconds.`;
  document.getElementById("time-elapsed-container").style.display = "flex";
  document.getElementById("time-elapsed-container").style.justifyContent = "center";
  document.getElementById("time-elapsed-pre-text").innerHTML = solvingTimePre;
  document.getElementById("time-elapsed-text").innerHTML = solvingTimeText;
  document.getElementById("time-elapsed-text").style.color = "green";
};

const clearGrid = () => {
  [...document.getElementsByTagName("input")].forEach(element => {
    element.value = "";
    element.disabled = false;
    element.classList.remove("filled");
  });
  document.getElementById("time-elapsed-container").style.display = "hidden";
  document.getElementById("time-elapsed-container").style.justifyContent = null;
  document.getElementById("time-elapsed-pre-text").innerHTML = "";
  document.getElementById("time-elapsed-text").innerHTML = "";
  document.getElementById("time-elapsed-text").style.color = "green";
};
