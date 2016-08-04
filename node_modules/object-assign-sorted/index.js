var objectAssign = require('object-assign');
var sortedObject = require('sorted-object');

module.exports = function objectAssignSorted() {
  return sortedObject(objectAssign.apply(null, arguments));
};
