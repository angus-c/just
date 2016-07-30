import React from 'react';
import Menu from './Menu';
import Page from './Page';
import data from '../data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const lastPath = location.href.split('/').pop();
    const fn = lastPath.indexOf('just-') == 0 ? lastPath : 'just-extend';
    console.log('*****' fn);
    this.state = {selectedFn: fn};
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
    window.history.pushState({}, null, innerText)
    this.setState({selectedFn: innerText});
  };
}
