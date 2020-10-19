import React from "react";
import ReactDOM from "react-dom";
import { Sudoku } from "./sudoku.js";
import "./sudoku.css";

class SudokuVisualizer extends Sudoku {
    constructor(props) {
        super(props);

        this.state = {
            grid: [
                [" ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " "]
            ],
            animationSpeed: 10, // in ms
        };

    }

    disableEverything = (state) => {
        // disable (or enable) everything (to avoid user interaction during animation)
        document.querySelectorAll("input").forEach((e) => {
            e.disabled = state;
        });

        document.querySelectorAll("button").forEach((e) => {
            e.disabled = state;
        })
    }

    showAnimation = () => {
        // disable everything
        this.disableEverything(true);

        let animations = this.getSudokuAnimations(this.state.grid.slice());
        let grid = document.getElementsByClassName("cell");

        if (animations.length === 0)
            return window.alert("Solution does not exist");

        for (let i=0; i<animations.length; i++) {
            setTimeout(() => {
                let [row, col, value, status] = animations[i];
                grid[row*9+col].firstChild.value = value;

                if (status) 
                    grid[row*9+col].firstChild.style.backgroundColor = "green";
                else 
                    grid[row*9+col].firstChild.style.backgroundColor = "red";

                if (i == animations.length-1)
                    this.disableEverything(false);
                
            }, this.state.animationSpeed*i);
        }

    }

    handleInputChange = (e, rowIndex, colIndex) => {
        let arr = this.state.grid.slice();
        arr[rowIndex][colIndex] = e.target.value;
        this.setState({grid: arr});
    }

    randomNumber = (min, max) => {  
        min = Math.ceil(min); 
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }


    render() {
        return (
            <div style={{display: "inline-block"}}>
                <h1>Sudoku Visualizer</h1>
                <ShowGrid grid={this.state.grid} handleInputChange={this.handleInputChange} />
                <button type="button" onClick={this.generateSudoku}>Generate Sudoku</button>
                <button type="button" onClick={this.showAnimation}>Solve</button>
            </div>
        );
    }
}


// for displaying the grid on screen
class ShowGrid extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let arr = this.props.grid.map((row, rowIndex) => {
            return row.map((value, colIndex) => {

                return (
                    <div className="cell">
                        {
                            value === " " ? <input key={rowIndex*9+colIndex} className="cell-element" onChange={(e) => {  this.props.handleInputChange(e, rowIndex, colIndex); } } value=" " /> : <input key={rowIndex*9+colIndex} className="cell-element" onChange={(e) => { this.props.handleInputChange(e, rowIndex, colIndex); }} value={value}/>
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

        return showGrid;
    }
}

let e = <SudokuVisualizer></SudokuVisualizer>;
ReactDOM.render(e, document.getElementById("root"));
