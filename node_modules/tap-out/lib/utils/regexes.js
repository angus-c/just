module.exports = {
  ok: new RegExp('^(not )?ok\\b(?:(?:\\s+(\\d+))?(?:\\s+(?:(?:\\s*-\\s*)?(.*)))?)?'),
  result: new RegExp('(#)(\\s+)((?:[a-z][a-z]+))(\\s+)(\\d+)',['i']),
  plan: /^(\d+)\.\.(\d+)\b(?:\s+#\s+SKIP\s+(.*)$)?/,
  comment: /^#\s*(.+)/,
  version: /^TAP\s+version\s+(\d+)/i,
  label_todo: /^(.*?)\s*#\s*TODO\s+(.*)$/
};