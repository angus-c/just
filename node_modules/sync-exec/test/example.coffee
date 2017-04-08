exec = require '../js/sync-exec'


delay_count = 0
delay_check = ->
  now = (new Date).getTime()
  unless res1 and res2 and t + 10000 <= now < t + 12000
    throw new Error 'Timing error'
  console.log 'DONE'

t = (new Date).getTime()
setTimeout delay_check, 10

process.stdout.write 'Test #1 (takes ~3 seconds) ... '
# { stdout: '1\n',
#   stderr: '',
#   status: 0 }
res1 = exec __dirname + '/sh/out.sh', {forceEmulation: true}
unless res1.stdout is '1\n' and res1.stderr is '' and res1.status is 0
  throw new Error 'Result #1 error:\n' + JSON.stringify res1, null, 2
console.log 'DONE'

# { stdout: '2\n',
#   stderr: '3\n',
#   status: 1 }
process.stdout.write 'Test #2 (takes ~3 seconds) ... '
res2 = exec __dirname + '/sh/err.sh', {forceEmulation: true}
unless res2.stdout is '2\n' and res2.stderr is '3\n' and res2.status is 1
  throw new Error 'Result #2 error:\n' + JSON.stringify res2, null, 2
console.log 'DONE'

process.stdout.write 'Test #3 (takes ~1 second) ... '
try
  exec __dirname + '/sh/out.sh', 1000, {forceEmulation: true}
  failed_to_stop = true
if failed_to_stop
  throw new Error 'Failed timeout'
console.log 'DONE'

process.stdout.write 'Test #4 (takes ~3 second) ... '
exec './out.sh', {cwd: __dirname + '/sh', forceEmulation: true}
console.log 'DONE'

process.stdout.write 'Test #5 ... ' # Timeout order test
