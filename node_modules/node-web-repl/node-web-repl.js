/**
 * Module dependencies.
 */

var extend = require('node.extend') //how is this not in node's core?
	, express = require('express')
	, hulk = require('hulk-hogan')
  , routes = require('./routes');

function createServer(options) {
	var defaultz = {
		host: false,
		port: 11911,
		username: '',
		password: ''
	}
	var options = extend({}, true, defaultz, options);
	if (!options.username || !options.password) throw new Error('username/password required');

	// Create Express instance
	var app = express.createServer();
	app.configure(function(){
		app.register('.hulk', hulk);
		app.set('views', __dirname + '/views');
		app.set('view engine', 'hulk');
		app.use(express.basicAuth(options.username, options.password));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(require('stylus').middleware({ src: __dirname + '/public' }));
		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
	});

	app.configure('development', function(){
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function(){
		app.use(express.errorHandler());
	});

	// Routes

	app.get('/', routes.index);
	app.post('/api', routes.api);

	app.listen(options.port, options.host, function(){
		console.log("node-web-repl server listening on port %d in %s mode", app.address().port, app.settings.env);
	});
}

exports.createServer = createServer;
