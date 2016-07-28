// Node Web REPL test app - a counter that you can inspect via your browser
// 
// Start this app and then navigate to http://localhost:11911 - once there,
// inspect and change 'global.hits'

// Our hit counter - what you'll be playing with:
global.hits = 0

var express = require('express')
	, webrepl = require('../node-web-repl');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get('/', function(req, res) {
	res.send('Node Web REPL test app - parent server - hit #' + global.hits++);
});

app.listen(3000, function(){
  console.log("Node Web REPL test app - parent server - listening on port %d in %s mode", app.address().port, app.settings.env);
	global.hits = 0;
	webrepl.createServer({username: 'kudu', password: 'zanzibar'});
});
