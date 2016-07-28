(function() {
  var app, express, hulk;

  express = require('express');

  hulk = require('../');

  app = express.createServer();

  app.set('views', __dirname + '/views');

  app.set('view options', {
    layout: false
  });

  app.set('view engine', 'hulk');

  app.register('.hulk', hulk);

  app.get('/', function(req, res) {
    return res.render('simple', {
      hello: 'world'
    });
  });

  app.listen(3000);

}).call(this);
