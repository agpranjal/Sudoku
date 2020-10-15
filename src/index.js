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
            ],
            animationSpeed: 10, // in ms
        };

    }

    showAnimation = () => {
        let animations = this.getSudokuAnimations(this.state.grid.slice());
        let grid = document.getElementsByClassName("cell");

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [row, col, value, status] = animations[i];
                grid[row*9+col].firstChild.value = value;
                if (status) {
                    grid[row*9+col].firstChild.style.color = "white";
                    grid[row*9+col].firstChild.style.backgroundColor = "green";
                }
                else {
                    grid[row*9+col].firstChild.style.color = "red";
                    grid[row*9+col].firstChild.style.backgroundColor = "red";
                }
            }, this.state.animationSpeed*i);
        }
    }

    handleInputChange = (e, rowIndex, colIndex) => {
        let arr = this.state.grid.slice();
        arr[rowIndex][colIndex] = e.target.value;
        this.setState({grid: arr});
    }

    render() {
        return (
        <div>
            <h1>Sudoku Visualizer (backtracking)</h1>
            <ShowGrid grid={this.state.grid} handleInputChange={this.handleInputChange} />
            <button type="button" onClick={this.showAnimation}>Solve</button>
        </div>
        );
    }
}


// for displaying the grid on screen
class ShowGrid extends React.Component {
    constructor(props) {
        super(props);

        let arr = this.props.grid.map((row, rowIndex) => {
            return row.map((value, colIndex) => {

                return (
                    <div className="cell">
                        {
                            value == 0 ? <input key={rowIndex*9+colIndex} className="cell-element" onChange={(e) => {  this.props.handleInputChange(e, rowIndex, colIndex); } } style={{color: "blue"}} value={value} /> : <input key={rowIndex*9+colIndex} className="cell-element" onChange={(e) => { this.props.handleInputChange(e, rowIndex, colIndex); }} value={value}/>
                        }
                    </div>
                );
            });
        });

        this.showGrid = [];
        for (let i=0; i<9; i++) {
            this.showGrid.push(arr[i]);
            this.showGrid.push(<br/>);
        }

    }

    render() {
        return this.showGrid;
    }
}

let e = <SudokuVisualizer></SudokuVisualizer>;
ReactDOM.render(e, document.getElementById("root"));
