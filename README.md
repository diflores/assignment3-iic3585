# Assignment 3: WebAssembly
By: Daniela Flores – Javiera Jorquera

## About
This Sudoku Solver was coded in C and then ported to WASM with [Emscripten](https://emscripten.org/). To compile it yourself, run:
```sh
$ cd c_code
$ emcc sudoku.c -s EXPORTED_FUNCTIONS='["_solveSudoku"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -o sudoku.js
$ emcc hexadoku.c -s EXPORTED_FUNCTIONS='["_solveHexadoku"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -o hexadoku.js
```

## How to run locally
1. `yarn install`.
2. `yarn run serve`.
3. Open http://127.0.0.1:5000 in your browser.
4. Enjoy!

## Live Demo

Visit https://danielaflores.io/assignment3-iic3585/