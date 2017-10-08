
# throw error if time limit has been exceeded

module.exports = (limit, msg) ->

  if Date.now() > limit
    throw new Error msg
