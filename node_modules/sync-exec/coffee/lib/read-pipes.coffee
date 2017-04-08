
fs = require 'fs'

timeout = require './timeout'


# Read from pipe files until they get closed/deleted
#
# @param dir String path to tmp files
# @param max_wait Number millisecond timeout value
#
# @return Object {stderr, stdout, status}

module.exports = (dir, max_wait) ->

  t_limit = Date.now() + max_wait

  until read
    try
      read = true if fs.readFileSync(dir + '/done').length
    timeout t_limit, 'Process execution timeout or exit flag read failure'

  until deleted
    try
      fs.unlinkSync dir + '/done'
      deleted = true
    timeout t_limit, 'Can not delete exit code file'

  result = {}
  for pipe in ['stdout', 'stderr', 'status']
    result[pipe] = fs.readFileSync dir + '/' + pipe, encoding: 'utf-8'
    read = true
    fs.unlinkSync dir + '/' + pipe

  try
    fs.rmdirSync dir

  result.status = Number result.status

  result
