import React, { Component } from 'react';
import './App.css';
import {Grid} from './Grid';

class Game extends Component {

    constructor(){
        super();
        this.state={data:[]};
    }

    componentDidMount(){

        fetch('http://localhost:9000/initGrid')
            .then(result=>{
                return result.json();
            })
            .then(data=>{
                return this.setState({data});
            })
    }

    render() {
        return (
            <div>
                <div className="grid">
                    <Grid data={this.state.data} />
                </div>
            </div>
        );
    }
}

export default Game;
