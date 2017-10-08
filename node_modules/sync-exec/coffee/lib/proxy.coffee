
child_process = require 'child_process'


# Use 0.12 native functionality when available (instead of emulated blocking)
#
# @param cmd String command to execute
# @param max_wait Number millisecond timeout value
# @param options Object child_process.execSync options (like: encoding)
#
# @return Object identical to emulated: {stderr, stdout, status}

module.exports = (cmd, max_wait, options) ->

  options.timeout = max_wait
  stdout = stderr = ''
  status = 0

  t0 = Date.now()

  orig_write = process.stderr.write
  process.stderr.write = ->
  try
    stdout = child_process.execSync cmd, options
    process.stderr.write = orig_write
  catch err
    process.stderr.write = orig_write
    if err.signal is 'SIGTERM' and t0 <= Date.now() - max_wait
      throw new Error 'Timeout'
    {stdout, stderr, status} = err

  {stdout, stderr, status}
