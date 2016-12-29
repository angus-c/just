module.exports = squash;

/*
  remove spaces, optionally remove escape sequences \b, \t, \n, \f, \r, \", \', and \\

  squash('the cat sat on the mat'); // thecatsatonthemat
  squash(' the cat sat on the mat '); // thecatsatonthemat
  squash(' the \'cat\'\n sat on the mat '); // the\'cat\'\nsatonthemat
  squash(' the \'cat\'\n sat on the mat ', true); // thecatsatonthemat
  squash(`the cat
sat on the mat`, true); // thecatsatonthemat
*/

var escapeSequencesRegex = /[\s\b\t\n\f\r\"\'\\]/g;
var spacesRegex = /\s/g;

function squash(str, squashEscapeSequences) {
  if (squashEscapeSequences) {
    return str.replace(escapeSequencesRegex, '');
  } else {
    return str.replace(spacesRegex, '');
  }
}
