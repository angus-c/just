import React from 'react';
import Evaluate from './Evaluate';

export default ({moduleName, script}) => (
  <section id="react-root" style={{flex: 3}} className="main-content">
    <div>
      <span>{moduleName}</span>
      <Evaluate script={script}/>
    </div>
  </section>
);
