const sameRow = (i,j) => Math.floor(i/16) === Math.floor(j/16);

const sameCol = (i,j) => ((i - j) % 16 === 0);

const sameBlock = (i,j) => (
	(Math.floor((i / (4 * 4 * 4)))) === (Math.floor(j / (4 * 4 * 4))) && (Math.floor((i % 16) / 4)) === (Math.floor((j % 16) / 4))
);

const verify = (output) => {
	for (let i = 0; i < 256; i++) {
		for (let j = 0; j < 256; j++) {
			if (sameRow(i, j) || sameCol(i, j) || sameBlock(i, j)) {
				if (output[i] === output[j] && i != j) {
					return false;
				}
			}
		}
	}
	return true;
};

const find = (array, current) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i] == current) {
			return i;
		}
	}
	return -1;
};

const solveHexadoku = (array) => {
	const i = find(array, '.');
	if (i < 0) {
		const isVerified = verify(array);
		if (isVerified){
			return array;
		} else {
			console.log('There is no valid solution');
			return -1;
		}
	}

	const ex_num = [];
	for (let j = 0; j < (16 * 16); j++) {
		if (sameRow(i, j) || sameCol(i, j) || sameBlock(i, j)) {
			ex_num.push(array[j]);
		}
	}

	const c = "0123456789ABCDEF";
	for (let j = 0; j < c.length; j++) {
		const found = find(ex_num, c[j]);
		if (found < 0){
			const rec_val = [];
			for (let x = 0; x < array.length; x++) {
				rec_val.push(array[x]);
			}
			rec_val[i] = c[j];
			const tmp = solveHexadoku(rec_val);
			if (tmp != -1) {
				return tmp;
			}
		}
	}
	return -1;
};

function sayHello(){
    let k = '2...1...........................................................................................................................................................................................................................................................';
    let expert = '.5...D...A...6.F.3....B0.95...CD.1.7F49A..D...3.B.....5....7.8.......0A2.6..9....49.....F......B1E75..8D..9.0.....6.3...D8...2.4D....6..97.28.........2..E3........8A1.5.0.......6E.....5.....7...5B6........A.....0.....B.654.12A.9.7...41...0.87..5....2..ECB.';
    
    let j = solveHexadoku(expert);
    if(j!=-1){
		j=j.join("");
    console.log(j);
    }
}

const solve = () => {
  const startTime = performance.now();
  const flattenSudoku = [];
  [...Array(256).keys()].map(i => {
    const value = parseInt(document.getElementById(`cell-${i}`).value);
    value ? flattenSudoku.push(value) : flattenSudoku.push('.');
	});
	const k = '2...1...........................................................................................................................................................................................................................................................';
	const expert = '.5...D...A...6.F.3....B0.95...CD.1.7F49A..D...3.B.....5....7.8.......0A2.6..9....49.....F......B1E75..8D..9.0.....6.3...D8...2.4D....6..97.28.........2..E3........8A1.5.0.......6E.....5.....7...5B6........A.....0.....B.654.12A.9.7...41...0.87..5....2..ECB.';
	let result = solveHexadoku(flattenSudoku.join(''));
  if (result != -1) {
		result = result.join('');
		console.log(result);
		[...Array(256).keys()].map(i => {
			if (result[i] === 0) {
				document.getElementById(`cell-${i}`).classList.add("filled");
			}
			document.getElementById(`cell-${i}`).value = result[i];
			document.getElementById(`cell-${i}`).disabled = true;
		});
	}
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