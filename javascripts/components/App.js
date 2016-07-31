import React from 'react';
import extend from 'just-extend';
import objectReduce from 'just-reduce-object';
import Menu from './Menu';
import Page from './Page';
import data from '../data';

const codeLookup = objectReduce(data, (acc, key, value) => {
  return extend(acc, value)
}, {});

console.log('codeLookup', codeLookup)

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const lastPath = location.href.split('/').pop();
    const fn = lastPath.indexOf('just-') == 0 ? lastPath : 'just-compare';
    this.state = {selectedFn: fn};
  }
  
  render() {
    return (
      <section className='container'>
        <Menu onSelect={this.onSelect.bind(this)} />
        <Page moduleName={this.state.selectedFn} script={codeLookup[this.state.selectedFn].code[0]} />
      </section>
    );
  }
  
  onSelect({target: {innerText}}) {
    window.history.pushState({}, null, innerText)
    this.setState({selectedFn: innerText});
  };
}
