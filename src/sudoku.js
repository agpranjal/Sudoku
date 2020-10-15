import React from "react";

class Sudoku extends React.Component {
    constructor(props) {
        super(props);
    }

    getSudokuAnimations = (grid) => {
        let empty = 0;
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                if (grid[i][j] == 0)
                    empty ++;
            }
        }

        let animations = [];
        if (!this.solveSudoku(grid, 0, 0, empty, animations))
            animations = [];
        
        return animations;
    }

    solveSudoku = (grid, row, col, empty, animations) => {
        if (empty == 0) 
            return true;

        if (row == 9) 
            return false;

        if (col == 9)
            return this.solveSudoku(grid, row+1, 0, empty, animations);

        if (grid[row][col] == 0) {
            for (let i=1; i<=9; i++) {
                if (this.isValid(grid, row, col, i)) {
                    grid[row][col] = i;
                    animations.push([row, col, i, true]);

                    if (this.solveSudoku(grid, row, col+1, empty-1, animations))
                        return true;

                    grid[row][col] = 0;
                    animations.push([row, col, " ", false]);
                }
            }
        } else {
            if (this.solveSudoku(grid, row, col+1, empty, animations))
                return true;
        }

        return false;
    }


    fillRecursively = (grid, row, col) => {
        this.getSudokuAnimations(grid);
    }

    generateSudoku = () => {
        // reset the grid color

        let array = Array.prototype.slice.call(document.getElementsByClassName("cell-element"));
        array.forEach((e) => {
            e.style.backgroundColor = "blue";
        });

        let arr = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        // fill the diagonal sub grids
        let n;
        let x = 0;
        for (let i=0; i<9; i++) {
            do {
                n = this.randomNumber(1, 9);
            } while (! this.validateSubGrid(arr, i, x, n));
            arr[i][x] = n;

            do {
                n = this.randomNumber(1, 9);
            } while (! this.validateSubGrid(arr, i, x+1, n));
            arr[i][x+1] = n;

            do {
                n = this.randomNumber(1, 9);
            } while (! this.validateSubGrid(arr, i, x+2, n));
            arr[i][x+2] = n;

            if ((i+1)%3 == 0)
                x += 3;
        }

        // recursively fill the rest of the sub grids
        this.fillRecursively(arr, 0, 0);

        // randomly remove K elements
        let visited = [];
        for (let i=0; i<81; i++)
            visited.push(0);

        let K = 50;
        while (K--) {
            let n, r, c;
            do {
                n = this.randomNumber(0, 80);
            } while (visited[n] == 1);

            r = Math.floor(n/9);
            c = Math.floor(n%9);
            arr[r][c] = " ";
            visited[n] = 1;
        }

        this.setState({grid: arr});
    }

    validateRow = (grid, row, col, value) => {
        // check validity in row
        for (let i=0; i<9; i++) {
            if (grid[row][i] == value)
                return false;
        }
        return true;
    }

    validateColumn = (grid, row, col, value) => {
        // check validity in col
        for (let i=0; i<9; i++) {
            if (grid[i][col] == value)
                return false;
        }
        
        return true;
    }

    validateSubGrid(grid, row, col, value) {
        // check validity in sub-grid
        let subGrid = [
            [0,1,2],
            [3,4,5],
            [6,7,8]
        ];

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



    isValid = (grid, row, col, value) => {
        return this.validateRow(grid, row, col, value) && this.validateColumn(grid, row, col, value) && this.validateSubGrid(grid, row, col, value);
    }
}

export { Sudoku };
