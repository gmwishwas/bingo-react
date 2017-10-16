import React, { Component } from 'react';

export class NumberComponent extends Component {

    constructor(){
        super();

    }


    render() {
        return (
            <div className="animated pulse"><span>{this.props.number}</span></div>
        )
    }
}
