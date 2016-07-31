import React from 'react';
import Evaluate from './Evaluate';

export default ({moduleName, script}) => (
  <section id="react-root" style={{flex: 3}} className="main-content right-col">
    <div>
      <a href="https://www.npmjs.com/package/{moduleName}">npm install {moduleName}</a>
      <Evaluate script={script}/>
    </div>
  </section>
);
