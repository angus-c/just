module.exports = capitalize;

/*
  capitalize('capitals'); // 'Capitals'
  capitalize('Capitals'); // 'Capitals'
  capitalize('CapiTALS'); // 'Capitals'
  capitalize('many Words'); // 'Many words'
  capitalize('!exclaim'); // '!exclaim'
*/

function capitalize(str) {
  if (typeof str != 'string') {
    throw Error('just-capitalize expects a string argument');
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
