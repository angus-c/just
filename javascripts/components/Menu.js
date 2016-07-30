import React from 'react';
import data from '../data';

export default ({onSelect}) => {
  return (
    <section style={{flex: 1}} className="main-content">
      <ul>
      {data.map(category => {
        <li style={{listStyle: 'none'}}>Objects</li>
        {category.map(fn => {
          <ul>
            <li className='link' style={{listStyle: 'none'}} onClick={onSelect}>just-extend</li>
          </ul>
        })}
      })}
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
     
