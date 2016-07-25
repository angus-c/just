Node Web REPL
=============

![Screenshot](http://www.modernmethod.com/send/files/node-web-repl-screenshot.gif)

This npm is currently a bit rough, but already has aided some of my debugging
efforts.

This npm adds a web-based command line to your Node.js apps. Use this to debug
your apps, alter behavior on the fly, review in-app data structures, ruin
everything, etc. You can event connect to your apps after they've been running
for months and see how they're doing.

Demo
----

How to use:

	var webrepl = require('node-web-repl');
	// setup your app as normal
	webrepl.createServer({
		username: 'admin',
		password: 'blob1010',
		port: 11911,
		host: '127.0.0.1'
	});

You'll (hopefully) now have a running web-based REPL on port 11911! Connect and
type in '1+2' to do some fun math, or 'globals' to browse the global object. 

See tests/ for a full example. (More examples coming soon.)

Architecture notes
------------------

Right now Node Web REPL creates its own Express server instance, instead of
plugging in to your existing routes. Motivation:

* Your existing app (to which you are adding the REPL) may not use Express.
* Separating the port numbers makes it safer against scanning (possibly).
* I can't assume that your Express app is using the same view system that
  mine is.
* Eventually, we may stop using Express entirely. Our needs are simple.

The Future
----------

Generally, I'd like Node Web REPL to be the first thing you plug in to your app
to start debugging once it goes live, and then what you use to build your app's
internal dashboard (something every app should have).

* Pass in custom UI elements like counters, scrollable messages (signups), etc.
* Hook console.log so you can view your console output via a web browser
* Allow you to pass in custom functions and data to be available in the repl
(right now you can only access stuff descending from the global scope)
* UI/UX cleanup - make it look slightly less like garbage, scrollbars, etc
* Visual data browser (scope out 'global' and descend from there)
* Profile on the fly
* View Node.js's memory usage
* Autocomplete
* MySQL console?
* Memcache console?
* Activity log?

Ingredients
-----------

We use Node.js, Express, HTTP auth via express.basicAuth middleware, and Hogan
for templating. [jcubic-jquery.terminal](http://terminal.jcubic.pl/) is used
for the type-in terminal code on the client side. Your input is sent via Ajax
to the /api endpoint, which eval()'s you code and spits back a string.

Author
------

Written by Thomas Lackner ([@tlack](http://twitter.com/tlack)) and sponsored
by [.CO](http://go.co)

