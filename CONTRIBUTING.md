* Modules must not depend on any other npm modules
* Always assume just modules will be used in hot code and code accordingly
  * Write ES5
  * Favor `for` loops over high order functions
  * Don't repeatedly access the same property, assign to a `var`
* API
  * Keep the API simple and intuitive
  * Avoid multiple arguments or option arguments whenever possible–-make it just do one thing
* README
  * Limit READMEs to showing examples of each use case
  * If you must explain the API (see above) do so in a comment in the README example code
  * Add a section in the general README that duplicates the individual README for your module
* Tests
  * Write a test for each use case
  * Include tests for all examples you included in the README
  * Too thorough is better than not thorough enough
* TypeScript
  * We're in the process of adding typescript defintions (`index.d.ts`) and tests (`index.tests.ts`) for every utility
  * Please add these files for your new utility if you feel comfortable doing so. [Here's](https://github.com/angus-c/just/pull/233/files) an example PR.
* Interactive gh-pages ([http://anguscroll.com/just](anguscroll.com/just))
  * We'll take care of this after we land your PR and publish the npm module
