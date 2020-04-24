// https://kapadia.github.io/emscripten/2013/09/13/emscripten-pointers-and-pointers.html

const solve = () => {
  const flattenSudoku = [];
  [...Array(81).keys()].map(i => {
    const value = parseInt(document.getElementById(`cell-${i}`).value);
    value ? flattenSudoku.push(value) : flattenSudoku.push(0);
  });
  solveSudoku = Module.cwrap("solveSudoku", "number", ["number"]);
  data = new Int32Array(flattenSudoku);
  const nDataBytes = data.length * data.BYTES_PER_ELEMENT;
  const dataPtr = Module._malloc(nDataBytes);
  const dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
  dataHeap.set(new Uint8Array(data.buffer));
  solveSudoku(dataHeap.byteOffset);
  const result = new Int32Array(
    dataHeap.buffer,
    dataHeap.byteOffset,
    data.length
  );
  // Free memory
  Module._free(dataHeap.byteOffset);
  const resultArray = Array.from(result);
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
