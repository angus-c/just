var _ = require('lodash');

module.exports = function (lines) {
  
  var leftPadding;
  
  // Get minimum padding count
  _.each(lines, function (line) {
    
    var spaceLen = line.match(/^\s+/)[0].length;
    
    if (leftPadding === undefined || spaceLen < leftPadding) {
      leftPadding = spaceLen;
    }
  });
  
  // Strip padding at beginning of line
  return _.map(lines, function (line) {
    
    return line.slice(leftPadding);
  });
}