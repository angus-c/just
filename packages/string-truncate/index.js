module.exports = truncate;

/*
  truncate('when shall we three meet again', 9); // 'when s...'
  truncate('when shall we three meet again', 10, ' (etc)'); // 'when (etc)'
  truncate('when shall we', 15,); // 'when shall we'
  truncate('when shall we', 15, '(more)'); // 'when shall we'
  truncate('when shall we', 7, ' (more)'); // ' (more)'
*/

function truncate(str, length, end) {
  if (length == null || length >= str.length) {
    return str;
  }
  if (end == null) {
    end = '...';
  }
  return str.slice(0, Math.max(0, length - end.length)) + end;
}
