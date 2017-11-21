# Tradeoffs

The most common reaction to Just is why not just use [__Lodash__](https://lodash.com/). Great question, and there are certainly times when you should use Lodash. Here I'll try (as impartially as possible) to document why you might, and why you might notm want to use Just.

Lodash is brilliantly engineered, well maintained and battle tested. So why would you ever need __Just__?

## Short, simplified answer
* Use __Lodash__ if it covers an edge case you care about (Lodash is _very_ good at covering edge cases)
* Use __Lodash__ if your app is going to be processing vast datastructures (100,000+ records). 
* Use __Lodash__, [__Underscore__](http://underscorejs.org/) or [__Ramda__](http://ramdajs.com/) if they provide a method that Just doesn't (and there are many).
* Use __Just__ if you care about JavaScript footprint (and none of the above applies).

## Why does JavaScript footprint matter?

[Alex Russell](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/) puts it better than I could:

> We regularly see sites loading more than 500KB of script (compressed). This matters because all script loading delays the metric we value most: Time to Interactive. Sites with this much script are simply inaccessible to a broad swath of the world’s users; statistically, users do not (and will not) wait for these experiences to load. Those that do experience horrendous jank.

JavaScript size is especially critical for mobile web development. As Alex points out, 45% of mobile connections occur over 2G worldwide. 75% of of connections occur on either 2G or 3G.

## How Big are Just utils?

Just modules are hand written so they include only essential code. All of them come in at well under 1kB minfied/gzipped[¹](#¹Data). 

Assuming you don't want to import the entire Lodash monolith, there are two ways to access individual Lodash modules. You can load submodules directly from the Lodash mono-library:  

`import camelCase from 'lodash/camelcase'`  

Alternatively, [Lodash Modularized](https://www.npmjs.com/browse/keyword/lodash-modularized) provides a set of dependency-free modules: 

`import camelCase from 'lodash.camelcase'`

Lodash Modularized modules are really modular by name only. They're generated from the Lodash mono-library by inlining all their dependencies, meaning they share a lot of redundant code and are generally much bigger than they need to be.

Module for module, both import techniques yield the same size, but if you want to import several Lodash modules the earlier technique becomes more efficient, since common dependencies are ony loaded once.

Check out the Just vs Lodash file size comparisons below. (Please note the disclaimer in the footnote[¹](#¹Data)) 

## How Robust are Just utils?

The following Just utils pass all Lodash unit tests for core functionality. The only "fails" are by design, for opinionated behaviors (notably argument coercion) which Just intentially avoids. These are noted in the table.

| Just  (size[¹](#¹Data))   |  Lodash  (Size[¹](#¹Data)) | Differences with Lodash |
| ---------------| -----------------|-------------------------------|
| just-values (127b) | values (562b)     | _a_  | 
| just-omit (80b) | omit (2540b)  |  _a, l_  |
| just-pick (75b) | pick (874b)  |  _a, l_  |
| just-map-values (54b) | mapvalues (4470b)      |  _a, b, j, k_  |
| just-map-keys (57b) | mapKeys  (4470b)  |  _a, b, j, k_  |
| just-safe-get (65b) | get (1750b)     |  _i_  |
| just-safe-set (108b) | set (1930b)     |  _i_ |
| just-split (145b) | chunk (756b)  | _a, b_  |
| just-flatten-it (99b) |flattendeep  (549b) | _a_   |
| just-tail (48b) | tail (111b)  |  _a_  |
| just-unique (268b) | uniq (1650b) | _a_ |
| just-zip-it (173b) | zip (517b) |  _a, c_  |
| just-compact (84b)  | compact (53b) | _a_   |
| just-intersect (115b) | intersection (361b)  | _a, n, o_ |
| just-camel-case (180b) | camelCase (2020b)      | _a_  |
| just-kebab-case (149b) | kebabCase (1720b)  | _a_   |
| just-snake-case (149b) | snakeCase (1720b)  | _a_   |
| just-left-pad (316b) | padstart (1190b)  |  _a, m_  |
| just-right-pad (316b) | padEnd  (1190b)  |  _a, m_  |
| just-clamp (116b) | clamp (355b)     |  _a, g, h_  |
| just-range (137b)  | range (705b) | (_none_)  |
| just-curry (72b) | curry (2860b)  |  _a, d, e_  |
| just-partial-it (98b) | partial (2940b) | _a, f_  |
| just-once (78b) | once (465b) |  _a_  |

_a._ Just expects correct argument type, Lodash coerces arguments to expected type\
_b._ Just does not invoke other Lodash as part of its implementation utils\
_c._ Lodash zip returns [] if no arguments, Just requires at least one argument\   
_d._ Lodash curry supports `_` placeholders. Just expects only just-partial to support such placeholders.\
_e._ Lodash curry can be used as a constructor\
_f._ instances of Lodash partial have a unique `instanceof` value.\
_g._ Lodash clamp works without a lower bound arg. Just always requires lower and upper bounds.\
_h._ If either bound is NaN, Lodash returns 0, Just returns NaN.\
_i._ just-get and just-set follows dotty for (obj, ['a.b']) style arguments. Lodash uses its own rules.\
_j._ Lodash invokes `_.identity` when predicate function is nullish\
_k._ Lodash accepts `_.property` shorthand instead of predicate function.\
_l._ Lodash will flatten arguments to pick and omit. e.g. `pick(obj, ['a', 'b'], 'c')` becomes `pick(obj, 'a', 'b', 'c')`\
_m._ When splitting left and right multi-character pads, Lodash truncates from the outside:\
`padStart('cde', 4, 'ab')` yields `'acde'`\
Just truncates from the inside:\
`just-left-pad('cde', 4, 'ab')` yields `'bcde'`\
_n._ Lodash works with just one argument, Just expects two\
_o._ Lodash treats NaN values as equal to one other 
      
__In addition__, these Just utilities, while lacking the additional features of their Lodash equivalents (noted below), match the feature set / behavior of _underscore_ and other comparable libraries.

| Just  (size[¹](#¹Data))   |  Lodash  (size[¹](#¹Data)) | Extra Lodash features |
| ---------------| -----------------|-------------------------------|
| just-truncate (54b) | truncate  | _b_|
| just-debounce (90b) | debounce      | _c, d, e_ |
| just-throttle (76b) | throttle      | _c, d, e_  |
| just-merge (142b) | merge      |  _f, g, h_ |
| just-clone (157b) | cloneDeep      | _f, g, h_   |

_a._ Lodash returns the unique set of intersects.\
_b._ In addition to a suffix arg, Lodash truncate accepts a separator exression, which when present is used as the truncation point.   
_c._ Lodash has a leading and trailing option, Just only has a leading option.\
_d._ Lodash cancels delayed calls.\
_e._ Lodash has a `flushed` method that can be applied to throttles/debounces.   
_f._ Lodash can merge circular references\
_g._ Just only merges plain objects, regular arrays, functions and primitives. Lodash merges additional non-plain object types. \
_h._ Lodash treats sparse arrays as dense

## What's the deal with no dependencies anyway?

See the [original blog post](https://medium.com/@angustweets/just-a12d54221f65)

##### ¹Size data generated by [package-size](https://github.com/egoist/package-size). This is the estimated minified, gzipped size for a standalone module. Actual size will vary depending on app bundle composition.

