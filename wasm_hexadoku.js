// https://kapadia.github.io/emscripten/2013/09/13/emscripten-pointers-and-pointers.html

const solve = () => {
  const startTime = performance.now();
  const flattenSudoku = [];
  [...Array(256).keys()].map(i => {
    const value = parseInt(document.getElementById(`cell-${i}`).value);
    value ? flattenSudoku.push(value) : flattenSudoku.push(".");
  });
  const flatStr = flattenSudoku.join("");
  console.log(flatStr);
  solveSudoku = Module.cwrap("solveHexadoku", "string", ["string"]);
  data = new Uint8ClampedArray(flattenSudoku);
  const result = solveSudoku(flatStr);
  const endTime = performance.now();
  [...result].forEach((_, index) => {
    if (flattenSudoku[index] === ".") {
      document.getElementById(`cell-${index}`).classList.add("filled");
    }
    document.getElementById(`cell-${index}`).value = result[index];
    document.getElementById(`cell-${index}`).disabled = true;
  });
  const totalTime = endTime - startTime;
  const solvingTimePre = "Solving time using JS: &nbsp";
  const solvingTimeText = `${totalTime / 1000} seconds.`;
  document.getElementById("time-elapsed-container").style.display = "flex";
  document.getElementById("time-elapsed-container").style.justifyContent =
    "center";
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
