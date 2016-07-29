var React = require('react');
var Tonic = require('./Tonic');

export default ({moduleName, script}) => (
  <section id="react-root" style="flex: 3" class="main-content">
    <div>
      <span>{moduleName}</span>
      <Tonic script={script}/>
    </div>
  </section>
);
