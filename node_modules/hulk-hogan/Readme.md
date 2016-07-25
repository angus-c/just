# Purpose

Connect [Hogan.js](http://twitter.github.com/hogan.js/) with [Express](http://expressjs.com/), with support for Partials.

```
Hi {{name}}

{{> salute}}
```

# Why is Hogan.js Awesome?

Logic-less templates, keeping control separate from views. Views separated from content.

Doesn't have many bells and whistles. HTML Structure, and views are suppose to be simple.

[Mustache](http://mustache.github.com/) is awesome. Has many implementations. It's clear `what's a {{variable}} and what is not`.

# Why Hulk-Hogan?

Becaues he's [awesome](http://en.wikipedia.org/wiki/Hulk_Hogan). But also because there wasn't a solution I could find that let's you easily use Mustaches' partials natively with Express.

## Partials Example

_body.hulk_

```
  {{> header}}
  My body.
  {{> footer}}
```

_header.hulk_

```
<h1>Hey There</h1>
```

_footer.hulk_

```
<footer>See ya</footer>
```

__Produces:__

```
  <h1>Hey There</h1>
  My body.
  <footer>See ya</footer>
```

---

### Sub-Partials supported

You can link partials from within other partials.

```
  main.hulk

  {{>body}}

  body.hulk

  {{>header}}
  {{>footer}}
```

# Usage Example

_views/index.hulk_

```mustache
Hello {{what}}!
```

__CoffeScript__

_app.coffee_

```coffee
  express = require 'express'
  hulk = require 'hulk-hogan'

  app = express.createServer()

  app.set 'views', __dirname+'/views'  # Directory of your views
  app.set 'view options', layout:false
  app.set 'view engine', 'hulk'  # use the .hulk file extensions for your views
  app.register '.hulk', hulk  # register to render .hulk with Hulk-Hogan

  app.get '/', (req,res)->
    res.render 'index', {what:'World'}

  app.listen 3000
```

`coffee app.coffee` _http://localhost:3000_ would produce: 

> Hello World!

__JavaScript__

_app.js_

```javascript
 var app, express, hulk;

 express = require('express');
 hulk = require('hulk-hogan');

 app = express.createServer();

 app.set('views', __dirname + '/views');
 app.set('view options', {layout: false});
 app.set('view engine', 'hulk');
 app.register('.hulk', hulk);

 app.get('/', function(req, res) {
   res.render('index', {
     what: 'World'
   });
 });

 app.listen(3000); 
  
```

`node app.js` _http://localhost:3000_ would produce:

> Hello World!

# Automated Tests

Hulk-Hogan uses [mocha](http://visionmedia.github.com/mocha/) & [mocha-cakes](https://github.com/quangv/mocha-cakes) for testing.

`make buffet` should run all tests.

# Thanks

Hulk-Hogan inspired by [HBS](https://github.com/donpark/hbs)

should checkout [express-hogan.js](https://github.com/Dundee/express-hogan.js)

and [Micah Smith's hogan-express.js blog post](http://allampersandall.blogspot.com/2011/12/hoganjs-expressjs-nodejs.html) for reference.

---

*Special Thanks* to the [Hogan.js](https://github.com/twitter/hogan.js) Twitter Team, as well as Hulk-Hogan's grand-dad, (or is it more like Great Uncle?) [Mustache](http://mustache.github.com/). 

Also Thanks to TJ for the excellent [Express](https://github.com/visionmedia/express) and [Express-Resource](https://github.com/visionmedia/express-resource).
