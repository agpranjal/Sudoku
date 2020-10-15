import React from "react";
import ReactDOM from "react-dom";
import { Sudoku } from "./app.js";

class SudokuVisualizer extends Sudoku {
    constructor(props) {
        super(props);

        this.state = {
            grid:[
                [3, 0, 6, 5, 0, 8, 4, 0, 0], 
                [5, 2, 0, 0, 0, 0, 0, 0, 0], 
                [0, 8, 7, 0, 0, 0, 0, 3, 1], 
                [0, 0, 3, 0, 1, 0, 0, 8, 0], 
                [9, 0, 0, 8, 6, 3, 0, 0, 5], 
                [0, 5, 0, 0, 9, 0, 6, 0, 0], 
                [1, 3, 0, 0, 0, 0, 2, 5, 0], 
                [0, 0, 0, 0, 0, 0, 0, 7, 4], 
                [0, 0, 5, 2, 0, 6, 3, 0, 0]
            ]
        };

        // in ms
        this.ANIMATION_SPEED = 10;
    }

    showAnimation = () => {
        let animations = this.getSudokuAnimations(this.state.grid.slice());
        let grid = document.getElementsByClassName("cell");

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [row, col, value, status] = animations[i];
                grid[row*9+col].firstChild.innerHTML = value;
                if (status) {
                    grid[row*9+col].firstChild.style.color = "white";
                    grid[row*9+col].style.backgroundColor = "green";
                }
                else {
                    grid[row*9+col].firstChild.style.color = "red";
                    grid[row*9+col].style.backgroundColor = "red";
                }
            }, this.ANIMATION_SPEED*i);
        }
    }

    render() {
        let arr = this.state.grid.map((row) => {
            return row.map((e) => {
                return (
                    <div className="cell">
                        {
                            e == 0 ? <span id="cell-element" style={{color: "blue"}}>hah</span> : <span id="cell-element">{e}</span>
                        }
                    </div>
                );
            });
        });

        let showGrid = [];
        for (let i=0; i<9; i++) {
            showGrid.push(arr[i]);
            showGrid.push(<br/>);
        }

        return (
        <div>
            {showGrid}
            <button type="button" onClick={this.showAnimation}>Solve</button>
        </div>
        );
    }
}

let e = <SudokuVisualizer></SudokuVisualizer>;
ReactDOM.render(e, document.getElementById("root"));
