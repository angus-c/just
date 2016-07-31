import React from 'react';
import data from '../data';
import objectMap from 'just-map-object';

var categoriesArr = [];

objectMap(data, (categoryName, fns) => {
  var fnsArr = [];
  objectMap(fns, fn => {
    fnsArr.push(fn);
  });
  categoriesArr.push({name: categoryName, fns: fnsArr});
})

export default ({selected, onSelect}) => {
  return (
    <section style={{flex: 2}} className="main-content left-col">
      <ul>
      {categoriesArr.map(category => (
        <div>
          <li style={{listStyle: 'none'}}>{category.name}</li>
          <ul>
          {category.fns.map(fn => {
            const className = (fn == selected) ? 'link selected' : 'link';
            return (
              <li className={className} style={{listStyle: 'none'}} onClick={onSelect}>{fn}</li>
            );
          })}
          </ul>
        </div>
      ))}
      </ul>
    </section>
  );
}

// export default ({onSelect}) => {
//   return (
//     <section style={{flex: 1}} className="main-content">
//       <ul>
//         <li style={{listStyle: 'none'}}>Objects</li>
//         <ul>
//           <li className='link' style={{listStyle: 'none'}} onClick={onSelect}>just-extend</li>
//         </ul>
//         <ul>
//           <li className='link' style={{listStyle: 'none'}} onClick={onSelect}>just-filter-object</li>
//         </ul>
//       </ul>
//     </section>
//   );
// }
     
