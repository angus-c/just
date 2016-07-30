import React from 'react';
import Menu from './Menu';
import Page from './Page';
import data from '../data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedFn: 'just-extend'};
  }
  
  render() {
    return (
      <section style={{display: 'flex'}}>
        <Menu onSelect={this.onSelect.bind(this)} />
        <Page moduleName={this.state.selectedFn} script={data[this.state.selectedFn].code[0]} />
      </section>
    );
  }
  
  onSelect({target: {innerText}}) {
    console.log('*****', this)
    this.setState({selectedFn: innerText});
  };
}
