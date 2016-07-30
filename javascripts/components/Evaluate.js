import React from 'react';
import Menu from './Menu';
import Page from './Page';

export default class Evaluate extends React.Component {
  componentDidMount() {
    const notebook = Tonic.createNotebook({
      // the parent element for the new notebook
      element: document.querySelector('#tonic'),
      source: this.props.script,
      onEvaluate: () => {
        console.log('*******');
      }
    })
  }
  
  render() {
    return (
      <div id="tonic"></div>
    );
  }
}
