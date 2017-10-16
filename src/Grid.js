import React, { Component } from 'react';
import {Tile} from './Tile';
import {NumberComponent} from './NumberComponent';

export class Grid extends Component {

    constructor(props){
        super(props);

        this.updateCurrentGrid = this.updateCurrentGrid.bind(this);

        this.resultsGrid= [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
            ];

        let min = 0;
        let max = 99;
        var number = Math.floor(Math.random() * (max - min)) + min;
        this.state= {
            currentNumber: number,
            lastCalledNumbers: [number],
            currentCount: 1,
            currentGrid: [],
            resultsGrid: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            winner: false
        };
    }

    listMatrix() {
        var matrix = [], k, i;
        var data = this.props.data
        for(i=0, k = 0; i < 25; i++) {
            if(i % 5 === 0) {
                k++;
                matrix[k] = [];
            }
            matrix[k].push(data[i]);
        }
        return matrix;
    }
    rowNodes() {
        var placeHolder = [];
        var that = this;
        let i=0;
        let matrix = this.listMatrix();
        matrix.map(function(numbers) {
            for(let n in numbers) {
                placeHolder.push(<Tile data={numbers[n]}
                                       key={numbers[n]}
                                       currentNumber={that.state.currentNumber}
                                       matrix={matrix}
                                       x={i}
                                       y={n}
                                       updateResults={that.updateCurrentGrid}/>);
            }
            i++;
        });
        return placeHolder;
    }

    updateCurrentNumberLabel() {
        var randomIndex = Math.floor(Math.random() * this.props.data.length);
        var number = this.props.data[randomIndex];

        if(this.state.currentCount === 90) {
            alert('All numbers have been called.');
            return;
        }

        if(this.state.lastCalledNumbers.indexOf(number) > -1) {
            return;
        }

        if(this.state.lastCalledNumbers.length === 5) {
            this.state.lastCalledNumbers.shift();
        }
        this.state.lastCalledNumbers.push(number);
        this.setState({currentNumber: number, lastCalledNumbers: this.state.lastCalledNumbers, currentCount: this.state.currentCount+1});
    }
    displayLastNumbers() {
        var node = [];
        this.state.lastCalledNumbers.map(function(number) {
            node.push(<NumberComponent number={number} />);
        });
        return node;
    }

    renderWinner() {
        if (this.state.winner) {
            return <h2>You are a winner of this game !</h2>;
        }

        return <h2>Game still in progress ...</h2>;
    }

    updateCurrentGrid(x,y) {
        this.resultsGrid[x][y] = 1;
    }

    checkWinner() {
        fetch('http://localhost:9000/checkWinner', {
            method: "POST",
            body: JSON.stringify(this.resultsGrid)
        })
            .then(result=>{
                return result.json();
            })
            .then(data=>{
                return this.setState({winner:data.result});
            })
    }

    render() {
        return (
            <div>
                <div className="info-container">
                    <div className="btn"><button onClick={this.updateCurrentNumberLabel.bind(this)} className="clouds-flat-button">Next!</button></div>
                    <div className="called-numbers">{ this.displayLastNumbers() }</div>
                </div>
                <div className="current-number">
                    <span>{this.state.currentNumber}</span>
                </div>
                <div className="bingo-grid">
                    { this.rowNodes() }
                </div>
                <div className="submit-button">
                    <input className="submit-button" type="button" value="Check Result" onClick={this.checkWinner.bind(this)}/>
                </div>

                {this.renderWinner()}

            </div>
        );
    }
}
