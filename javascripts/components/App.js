import React from 'react';
import Menu from './Menu';
import Page from './Page';

var onSelect = () => console.log('selected');

export default class App extends React.Component {
  render() {
    return (
      <section style={{display: 'flex'}}>
        <Menu onSelect={onSelect} />
        <Page moduleName={'just-extend'} script={`const extend = require('just-extend')\n
let obj = {a: 3, b: 5}
extend(obj, {a: 4, c: 8});
obj; // {a: 4, b: 5, c: 8}`} />
      </section>
    );
  }
}
