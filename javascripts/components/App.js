var React = require('react');
var Menu = require('./Menu');
var Page = require('./Page');

var onSelect = () => console.log('selected');

export default ({moduleName, script}) => (
  <section style="display: flex">
    <Menu onSelect={onSelect} />
    <Page moduleName={moduleName} script={script} />
  </section>
);
