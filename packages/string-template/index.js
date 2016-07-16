module.exports = template;

/*
  var data = {
    a: {
      aa: {
        aaa: 'apple',
        bbb: 'pear'
      },
      bb: 'orange'
    },
    b: 'plum'
  };
  template('2 ${a.aa.aaa}s, a ${a.aa.bbb}, 3 ${a.bb}s and a ${b}. Yes 1 ${a.aa.bbb}.', data);
  // '2 apples, a pear, 3 oranges and a plum. Yes 1 pear.'
*/

function template(string, data) {
  var proxyRegEx = /\$\{([^\}]+)?\}/g;
  return string.replace(proxyRegEx, function (_, key) {
    var keyParts = key.split('.');
    var value = data;
    for (var i = 0; i < keyParts.length; i++) {
      value = value[keyParts[i]];
    }
    return value || '';
  });
}
