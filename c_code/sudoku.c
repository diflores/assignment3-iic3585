#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

bool checkIfAnyEmptyCell(int board[9][9], int *row, int *col)
{
    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            if (board[i][j] == 0)
            {
                *row = i;
                *col = j;
                return true;
            }
        }
    }
    return false;
}

bool usedIn3x3(int board[9][9], int rowOffset, int colOffset, int candidateNumber)
{
    for (size_t i = 0; i < 3; i++)
    {
        for (size_t j = 0; j < 3; j++)
        {
            if (board[i + rowOffset][j + colOffset] == candidateNumber)
            {
                return true;
            }
        }
    }
    return false;
}

bool usedInRow(int board[9][9], int rowIndex, int candidateNumber)
{
    for (size_t j = 0; j < 9; j++)
    {
        if (board[rowIndex][j] == candidateNumber)
        {
            return true;
        }
    }
    return false;
}

bool usedInColumn(int board[9][9], int colIndex, int candidateNumber)
{
    for (size_t i = 0; i < 9; i++)
    {
        if (board[i][colIndex] == candidateNumber)
        {
            return true;
        }
    }
    return false;
}

bool isValidNumber(int board[9][9], int rowIndex, int colIndex, int candidateNumber)
{
    return board[rowIndex][colIndex] == 0 && !usedIn3x3(board, rowIndex - rowIndex % 3, colIndex - colIndex % 3, candidateNumber) && !usedInRow(board, rowIndex, candidateNumber) && !usedInColumn(board, colIndex, candidateNumber);
}

bool isSolved(int board[9][9])
{
    int row = 0;
    int col = 0;
    if (!checkIfAnyEmptyCell(board, &row, &col))
    {
        return true;
    }
    for (size_t value = 1; value < 10; value++)
    {
        if (isValidNumber(board, row, col, value))
        {
            board[row][col] = value;
            if (isSolved(board))
            {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}

int *solveSudoku(int board[9][9])
{
    isSolved(board);
    int flatBoard[81];
    for (size_t i = 0; i < 9; i++)
    {
        for (size_t j = 0; j < 9; j++)
        {
            flatBoard[9 * i + j] = board[i][j];
        }
    }

    return flatBoard;
}