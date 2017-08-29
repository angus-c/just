module.exports = reemit
module.exports.filter = filter

var EventEmitter = require('events').EventEmitter

function reemit (source, target, events) {
  if (!Array.isArray(events)) events = [ events ]

  var listeners = []
  events.forEach(function (event) {
    var listener = function () {
      var args = [].slice.call(arguments)
      args.unshift(event)
      target.emit.apply(target, args)
    }
    listeners.push(listener)
    source.on(event, listener)
  })

  return function cancel () {
    events.forEach(function (event, i) {
      source.removeListener(event, listeners[i])
    })
  }
}

function filter (source, events) {
  var emitter = new EventEmitter()
  reemit(source, emitter, events)
  return emitter
}
