
child_process = require 'child_process'

create_pipes = require './lib/create-pipes'
proxy        = require './lib/proxy'
read_pipes   = require './lib/read-pipes'
timeout      = require './lib/timeout'


# Blocking exec
#
# @param cmd String command to execute
# @param max_wait Number millisecond timeout value
# @param options Object execution options (like: encoding)
#
# @return Object {String stderr, String stdout, Number status}

module.exports = (cmd, max_wait, options) ->

  if max_wait and typeof max_wait is 'object'
    [options, max_wait] = [max_wait, null]

  options ?= {}

  unless options.hasOwnProperty 'encoding'
    options.encoding = 'utf8'

  unless typeof options is 'object' and options
    throw new Error 'options must be an object'

  max_wait ?= options.timeout or options.max_wait or 3600000 # 1hr default
  unless not max_wait? or max_wait >= 1
    throw new Error '`options.timeout` must be >=1 millisecond'
  delete options.max_wait

  # use native child_process.execSync if available (from node v0.12+)
  if options.forceEmulation
    delete options.forceEmulation
  else if child_process.execSync
    return proxy cmd, max_wait, options

  delete options.timeout

  dir = create_pipes()
  cmd = '((((' + cmd + ' > ' + dir + '/stdout 2> ' + dir + '/stderr ) ' +
        '&& echo $? > ' + dir + '/status) || echo $? > ' + dir + '/status) &&' +
        ' echo 1 > ' + dir + '/done) || echo 1 > ' + dir + '/done'
  child_process.exec cmd, options, ->

  read_pipes dir, max_wait
