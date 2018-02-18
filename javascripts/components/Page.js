import React from 'react';
import Evaluate from './Evaluate';

export default ({ moduleName, script }) => (
  <section
    id="react-root"
    style={{ flex: 5 }}
    className="main-content right-col"
  >
    <div>
      <ul>
        <li>
          <span style={{ fontSize: 20, fontWeight: 'bold' }}>{moduleName}</span>
        </li>
        <li>
          <span style={{ fontFamily: 'consolas' }}>
            npm install{' '}
            <a
              class="link selected"
              href={`https://www.npmjs.com/package/${moduleName}`}
            >
              {moduleName}
            </a>
          </span>
        </li>
      </ul>
      <Evaluate script={script} />
    </div>
  </section>
);
