sync-exec
=========

An fs.execSync replacement until you get it natively from node 0.12+

Upgrading to 0.12.x is usually safe. At that point it will use child_process.execSync.

You can still force the emulated version passing `{forceEmulated: true}` to the `options` argument.


# Advantages
Inspired by [exec-sync](https://www.npmjs.org/package/exec-sync) but comes with a few advantages:
- no libc requirement (no node-gyp compilation)
- no external dependencies
- returns the exit status code
- you can pass [execSync options](http://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options)
- multiple commands should work pretty safely

# Installation
    [sudo] npm install sync-exec

# Signature
    exec(cmd[, timeout][, options]);

# Examples
    var exec = require('sync-exec');

    // { stdout: '1\n',
    //   stderr: '',
    //   status: 0 }
    console.log(exec('echo 1'));

    // You can even pass options, just like for [child_process.exec](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
    console.log(exec('ls -la', {cwd: '/etc'}));

    // Times out after 1 second, throws an error
    exec('sleep 3; echo 1', 1000);

# How it works (if you care)
Your commands STDOUT and STDERR outputs will be channeled to files, also the exit code will be saved. Synchronous file readers will start listening to these files right after. Once outputting is done, values get picked up, tmp files get deleted and values are returned to your code.
