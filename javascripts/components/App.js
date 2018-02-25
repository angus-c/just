import React from 'react';
import extend from 'just-extend';
import objectReduce from 'just-reduce-object';
import Menu from './Menu';
import Page from './Page';
import data from '../data';

const codeLookup = objectReduce(
  data,
  (acc, key, value) => {
    return extend(acc, value.utils);
  },
  {}
);

// window.onpopstate = function() {
//   alert("location: " + document.location);
//   // this.setState({selectedFn: location.href.split('/').pop()});
// }

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedFn: this.fnFromUrl(location.href) };
    window.onpopstate = () =>
      this.setState({ selectedFn: this.fnFromUrl(location.href) });
  }

  render() {
    return (
      <section className="container">
        <Menu
          selected={this.state.selectedFn}
          onSelect={this.onSelect.bind(this)}
        />
        <Page
          moduleName={this.state.selectedFn}
          script={codeLookup[this.state.selectedFn].code[0]}
        />
      </section>
    );
  }

  fnFromUrl() {
    const lastPath = location.href.split('/').pop();
    return lastPath.indexOf('just-') == 0 ? lastPath : 'just-clone';
  }

  onSelect({ target: { innerText } }) {
    window.history.pushState({}, null, innerText);
    this.setState({ selectedFn: innerText });
  }
}
