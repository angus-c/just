
# Guidelines
* Modules must not depend on any other npm modules
* Always assume Just modules will be used in hot code and code accordingly
  * Write ES5
  * Favor `for` loops over high order functions
  * Don't repeatedly access the same property, assign to a `var`
* Brevity
  * A lot of people choose Just utilities to minimize their app's JS footprint in memory/network constrained environments
  * Keep it brief and don't add redundant code. Most utilites should fit into one shortish function.
* API
  * Keep the API simple and intuitive
  * Avoid multiple arguments or option arguments whenever possible–-make it just do one thing
* README
  * Limit READMEs to showing examples of each use case
  * If you must explain the API (see above) do so in a comment in the README example code
  * Add a section in the general README that duplicates the individual README for your module
* Tests
  * Write a test for each use case
  * At a minimim, include tests for each example you included in the README
  * Too thorough is better than not thorough enough
* TypeScript
  * We're in the process of adding typescript defintions (`index.d.ts`) and tests (`index.tests.ts`) for every utility
  * Please add these files for your new utility if you feel comfortable doing so. [Here's](https://github.com/angus-c/just/pull/247/files) an example PR.
  * Also add `"types": "index.d.ts"` after `main` entry in package.json. 
  * You can verify new TypeScript definitions by running `yarn test-types` (This also gets run as part of the `yarn test` script)
* Interactive gh-pages ([http://anguscroll.com/just](anguscroll.com/just))
  * We'll take care of this after we land your PR and publish the npm module

# App Testing
[Raul Melo](https://github.com/raulfdm) has written [a nice test framework](https://github.com/devraul/just-test) for testing cjs and esm imports of Just utilities in a variety of common app environments. Take advantage of this if you want to test how a module will work in the context of a given app.
