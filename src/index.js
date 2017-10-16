import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './App';

function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

for (var a=[],i=0;i<100;++i) a[i]=i+1;
var randomRows = shuffle(a);

ReactDOM.render(<Game tableData={randomRows} />, document.getElementById('root'));
