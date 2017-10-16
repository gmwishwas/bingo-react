import React, { Component } from 'react';

export class Tile extends Component {

    constructor(props){
        super(props);

        var name = (this.props.data === this.props.currentNumber) ? 'tile active' : 'tile';
        this.state= {
            className: name,
            matrix: props.matrix,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data === nextProps.currentNumber;
    }

    render() {
        var name = 'tile';
        if(this.props.data === this.props.currentNumber) {
            name = 'tile active';
            this.props.updateResults(this.props.x,this.props.y)

        }
        return (
            <div className={name}>
                {this.props.data}
            </div>
        );
    }
}
