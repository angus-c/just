import React from 'react';
import Menu from './Menu';
import Page from './Page';

let notebook;

export default class Evaluate extends React.Component {
  componentDidMount() {
    debugger;
    notebook = RunKit.createNotebook({
      element: document.querySelector('#tonic'),
      source: this.props.script
    });
  }

  componentWillUpdate(props) {
    notebook.setSource(props.script);
  }

  render() {
    return <div style={{ paddingTop: 20 }} id="tonic" />;
  }
}
