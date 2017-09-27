import React from 'react';
import data from '../data';
import objectMap from 'just-map-object';

var categoriesArr = [];
const sizeTipText = 'gzipped size (data from VSCode Cost Import extension)';

objectMap(data, (categoryName, categoryValue) => {
  var fnsArr = [];
  objectMap(categoryValue.utils, (name, value) => {
    fnsArr.push({ name, size: value.size });
  });
  categoriesArr.push({
    name: categoryName,
    symbol: categoryValue.symbol,
    fns: fnsArr
  });
});

export default ({ selected, onSelect }) => {
  return (
    <section style={{ flex: 2 }} className="main-content left-col">
      <ul key={'u1-x-' + 0}>
        {categoriesArr.map((category, i) => (
          <div>
            <li
              className="category"
              key={'li-x-' + i}
              style={{ listStyle: 'none' }}
            >
              <span>{category.name}</span>
              <span style={{ 'font-family': 'Menlo', color: '#aaa' }}>
                {' ' + category.symbol}
              </span>
            </li>
            <ul key={'ul-y-' + i}>
              {category.fns.map((fn, j) => {
                debugger;
                const className =
                  fn.name == selected ? 'link selected' : 'link';
                return (
                  <li key={j} style={{ listStyle: 'none' }}>
                    <span onClick={onSelect} className={className}>
                      {fn.name}
                    </span>
                    <span className="size" title={sizeTipText}>
                      {` (${fn.size || '345'} bytes)`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </ul>
    </section>
  );
};
