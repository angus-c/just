import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

console.log('type of ', typeof App);
console.log('type of Class', typeof new class Hello {} );

ReactDOM.render(<App/>, document.querySelector('#react-root'));
