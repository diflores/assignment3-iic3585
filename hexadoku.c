#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

char hexaChars[16] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

bool checkIfAnyEmptyCell(char board[16][16], int *row, int *col)
{
    for (size_t i = 0; i < 16; i++)
    {
        for (size_t j = 0; j < 16; j++)
        {
            if (board[i][j] == '.')
            {
                *row = i;
                *col = j;
                return true;
            }
        }
    }
    return false;
}

bool usedIn4x4(char board[16][16], int rowOffset, int colOffset, char candidateNumber)
{
    for (size_t i = 0; i < 4; i++)
    {
        for (size_t j = 0; j < 4; j++)
        {
            if (board[i + rowOffset][j + colOffset] == candidateNumber)
            {
                return true;
            }
        }
    }
    return false;
}

bool usedInRow(char board[16][16], int rowIndex, char candidateNumber)
{
    for (size_t j = 0; j < 16; j++)
    {
        if (board[rowIndex][j] == candidateNumber)
        {
            return true;
        }
    }
    return false;
}

bool usedInColumn(char board[16][16], int colIndex, char candidateNumber)
{
    for (size_t i = 0; i < 16; i++)
    {
        if (board[i][colIndex] == candidateNumber)
        {
            return true;
        }
    }
    return false;
}

bool isValidNumber(char board[16][16], int rowIndex, int colIndex, char candidateNumber)
{
    return board[rowIndex][colIndex] == '.' && !usedIn4x4(board, rowIndex - rowIndex % 4, colIndex - colIndex % 4, candidateNumber) && !usedInRow(board, rowIndex, candidateNumber) && !usedInColumn(board, colIndex, candidateNumber);
}

bool isSolved(char board[16][16])
{
    int row = 0;
    int col = 0;
    if (!checkIfAnyEmptyCell(board, &row, &col))
    {
        return true;
    }
    for (size_t value = 0; value < 16; value++)
    {
        if (isValidNumber(board, row, col, hexaChars[value]))
        {
            board[row][col] = hexaChars[value];
            if (isSolved(board))
            {
                return true;
            }
            board[row][col] = '.';
        }
    }
    return false;
}

char *solveHexadoku(char board[16][16])
{
    isSolved(board);
    char flatBoard[256];
    for (size_t i = 0; i < 16; i++)
    {
        for (size_t j = 0; j < 16; j++)
        {
            flatBoard[16 * i + j] = board[i][j];
        }
    }

    return flatBoard;
}

void printGrid(char board[16][16])
{
    for (int row = 0; row < 16; row++)
    {
        for (int col = 0; col < 16; col++)
            printf("%c", board[row][col]);
        printf("\n");
    }
}