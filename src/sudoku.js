import React from "react";

class Sudoku extends React.Component {
    constructor(props) {
        super(props);
    }

    getSudokuAnimations = (grid) => {
        let zeros = 0;
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                if (grid[i][j] == 0)
                    zeros ++;
            }
        }

        let animations = [];
        if (!this.sudokuHelper(grid, 0, 0, zeros, animations))
            animations = [];
        
        return animations;
    }

    sudokuHelper = (grid, row, col, zeros, animations) => {
        if (zeros == 0) 
            return true;

        if (row == 9) 
            return false;

        if (col == 9)
            return this.sudokuHelper(grid, row+1, 0, zeros, animations);

        if (grid[row][col] == 0) {
            for (let i=1; i<=9; i++) {
                if (this.isValid(grid, row, col, i)) {
                    grid[row][col] = i;
                    animations.push([row, col, i, true]);

                    if (this.sudokuHelper(grid, row, col+1, zeros-1, animations))
                        return true;

                    grid[row][col] = 0;
                    animations.push([row, col, " ", false]);
                }
            }
        } else {
            if (this.sudokuHelper(grid, row, col+1, zeros, animations))
                return true;
        }

        return false;
    }

    isValid = (grid, row, col, value) => {
        // check validity in row
        for (let i=0; i<9; i++) {
            if (grid[row][i] == value)
                return false;
        }

        // check validity in col
        for (let i=0; i<9; i++) {
            if (grid[i][col] == value)
                return false;
        }

        // check validity in sub-grid
        let subGrid = [[0,1,2], [3,4,5], [6,7,8]];
        let r = Math.floor(row/3);
        let c = Math.floor(col/3);

        for (let i of subGrid[r]) {
            for (let j of subGrid[c]) {
                if (grid[i][j] == value)
                    return false;
            }
        }

        return true;
    }
}

export { Sudoku };
