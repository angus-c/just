import React from 'react';
import Evaluate from './Evaluate';

export default class Page extends React.Component {
  render() {
    const { moduleName, script } = this.props;
    return (
      <section
        id="react-root"
        style={{ flex: 5 }}
        className="main-content right-col"
      >
        <div>
          <ul>
            <li key={'header'}>
              <span style={{ fontSize: 36, color: '#000' }}>{moduleName}</span>
              <span style={{ fontSize: 14 }}>
                {'\u00a0\u00a0\u00a0'}
                <a
                  className="link selected"
                  href={`https://github.com/angus-c/just#${moduleName}`}
                >
                  API
                </a>
              </span>
              {', '}
              <span style={{ fontSize: 14 }}>
                <a
                  className="link selected"
                  href={`https://www.npmjs.com/package/${moduleName}`}
                >
                  NPM
                </a>
              </span>
              {''}
            </li>
            <li key={'npm'}>
              <span style={{ fontFamily: 'consolas' }}>
                {`npm install ${moduleName}`}
              </span>
            </li>
            <li key={'yarn'}>
              <span style={{ fontFamily: 'consolas' }}>
                {`yarn add ${moduleName}`}
              </span>
            </li>
            <li key={'repl'}>
              <Evaluate script={script} />
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
