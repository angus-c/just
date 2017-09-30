QUnit.module('lodash.camelCase');

(function() {
  QUnit.test('should work with numbers', function(assert) {
    assert.expect(6);

    assert.strictEqual(_.camelCase('12 feet'), '12Feet');
    assert.strictEqual(_.camelCase('enable 6h format'), 'enable6HFormat');
    assert.strictEqual(_.camelCase('enable 24H format'), 'enable24HFormat');
    assert.strictEqual(_.camelCase('too legit 2 quit'), 'tooLegit2Quit');
    assert.strictEqual(_.camelCase('walk 500 miles'), 'walk500Miles');
    assert.strictEqual(_.camelCase('xhr2 request'), 'xhr2Request');
  });

  QUnit.test('should handle acronyms', function(assert) {
    assert.expect(6);

    lodashStable.each(['safe HTML', 'safeHTML'], function(string) {
      assert.strictEqual(_.camelCase(string), 'safeHtml');
    });

    lodashStable.each(['escape HTML entities', 'escapeHTMLEntities'], function(string) {
      assert.strictEqual(_.camelCase(string), 'escapeHtmlEntities');
    });

    lodashStable.each(['XMLHttpRequest', 'XmlHTTPRequest'], function(string) {
      assert.strictEqual(_.camelCase(string), 'xmlHttpRequest');
    });
  });
})();

//---------------------

QUnit.module('lodash.clamp');

(function() {
  QUnit.test('should work with a `max` argument', function(assert) {
    assert.expect(2);

    assert.strictEqual(_.clamp(5, 3), 3);
    assert.strictEqual(_.clamp(1, 3), 1);
  });

  QUnit.test('should clamp negative numbers', function(assert) {
    assert.expect(3);

    assert.strictEqual(_.clamp(-10, -5, 5), -5);
    assert.strictEqual(_.clamp(-10.2, -5.5, 5.5), -5.5);
    assert.strictEqual(_.clamp(-Infinity, -5, 5), -5);
  });

  QUnit.test('should clamp positive numbers', function(assert) {
    assert.expect(3);

    assert.strictEqual(_.clamp(10, -5, 5), 5);
    assert.strictEqual(_.clamp(10.6, -5.6, 5.4), 5.4);
    assert.strictEqual(_.clamp(Infinity, -5, 5), 5);
  });

  QUnit.test('should not alter negative numbers in range', function(assert) {
    assert.expect(3);

    assert.strictEqual(_.clamp(-4, -5, 5), -4);
    assert.strictEqual(_.clamp(-5, -5, 5), -5);
    assert.strictEqual(_.clamp(-5.5, -5.6, 5.6), -5.5);
  });

  QUnit.test('should not alter positive numbers in range', function(assert) {
    assert.expect(3);

    assert.strictEqual(_.clamp(4, -5, 5), 4);
    assert.strictEqual(_.clamp(5, -5, 5), 5);
    assert.strictEqual(_.clamp(4.5, -5.1, 5.2), 4.5);
  });

  QUnit.test('should not alter `0` in range', function(assert) {
    assert.expect(1);

    assert.strictEqual(1 / _.clamp(0, -5, 5), Infinity);
  });

  QUnit.test('should clamp to `0`', function(assert) {
    assert.expect(1);

    assert.strictEqual(1 / _.clamp(-10, 0, 5), Infinity);
  });

  QUnit.test('should not alter `-0` in range', function(assert) {
    assert.expect(1);

    assert.strictEqual(1 / _.clamp(-0, -5, 5), -Infinity);
  });

  QUnit.test('should clamp to `-0`', function(assert) {
    assert.expect(1);

    assert.strictEqual(1 / _.clamp(-10, -0, 5), -Infinity);
  });

  QUnit.test('should return `NaN` when `number` is `NaN`', function(assert) {
    assert.expect(1);

    assert.deepEqual(_.clamp(NaN, -5, 5), NaN);
  });

  QUnit.test('should coerce `min` and `max` of `NaN` to `0`', function(assert) {
    assert.expect(2);

    assert.deepEqual(_.clamp(1, -5, NaN), 0);
    assert.deepEqual(_.clamp(-1, NaN, 5), 0);
  });
})();

//-------------

QUnit.module('clone methods');

(function() {
  function Foo() {
    this.a = 1;
  }
  Foo.prototype.b = 1;
  Foo.c = function() {};

  if (Map) {
    var map = new Map();
    map.set('a', 1);
    map.set('b', 2);
  }
  if (Set) {
    var set = new Set();
    set.add(1);
    set.add(2);
  }
  var objects = {
    '`arguments` objects': arguments,
    arrays: ['a', ''],
    'array-like-objects': {'0': 'a', '1': '', length: 3},
    booleans: false,
    'boolean objects': Object(false),
    'date objects': new Date(),
    'Foo instances': new Foo(),
    objects: {a: 0, b: 1, c: 2},
    'objects with object values': {a: /a/, b: ['B'], c: {C: 1}},
    'objects from another document': realm.object || {},
    maps: map,
    'null values': null,
    numbers: 0,
    'number objects': Object(0),
    regexes: /a/gim,
    sets: set,
    strings: 'a',
    'string objects': Object('a'),
    'undefined values': undefined,
  };

  objects.arrays.length = 3;

  var uncloneable = {
    'DOM elements': body,
    functions: Foo,
    generators: generator,
  };

  lodashStable.each(errors, function(error) {
    uncloneable[error.name + 's'] = error;
  });

  QUnit.test('`_.clone` should perform a shallow clone', function(assert) {
    assert.expect(2);

    var array = [{a: 0}, {b: 1}],
      actual = _.clone(array);

    assert.deepEqual(actual, array);
    assert.ok(actual !== array && actual[0] === array[0]);
  });

  QUnit.test('`_.cloneDeep` should deep clone objects with circular references', function(assert) {
    assert.expect(1);

    var object = {
      foo: {b: {c: {d: {}}}},
      bar: {},
    };

    object.foo.b.c.d = object;
    object.bar.b = object.foo.b;

    var actual = _.cloneDeep(object);
    assert.ok(actual.bar.b === actual.foo.b && actual === actual.foo.b.c.d && actual !== object);
  });

  QUnit.test('`_.cloneDeep` should deep clone objects with lots of circular references', function(
    assert
  ) {
    assert.expect(2);

    var cyclical = {};
    lodashStable.times(LARGE_ARRAY_SIZE + 1, function(index) {
      cyclical['v' + index] = [index ? cyclical['v' + (index - 1)] : cyclical];
    });

    var clone = _.cloneDeep(cyclical),
      actual = clone['v' + LARGE_ARRAY_SIZE][0];

    assert.strictEqual(actual, clone['v' + (LARGE_ARRAY_SIZE - 1)]);
    assert.notStrictEqual(actual, cyclical['v' + (LARGE_ARRAY_SIZE - 1)]);
  });

  QUnit.test('`_.cloneDeepWith` should provide `stack` to `customizer`', function(assert) {
    assert.expect(164);

    var Stack,
      keys = [null, undefined, false, true, 1, -Infinity, NaN, {}, 'a', symbol || {}];

    var pairs = lodashStable.map(keys, function(key, index) {
      var lastIndex = keys.length - 1;
      return [key, keys[lastIndex - index]];
    });

    _.cloneDeepWith({a: 1}, function() {
      if (arguments.length > 1) {
        Stack || (Stack = _.last(arguments).constructor);
      }
    });

    var stacks = [new Stack(pairs), new Stack(pairs)];

    lodashStable.times(LARGE_ARRAY_SIZE - pairs.length + 1, function() {
      stacks[1].set({}, {});
    });

    lodashStable.each(stacks, function(stack) {
      lodashStable.each(keys, function(key, index) {
        var value = pairs[index][1];

        assert.deepEqual(stack.get(key), value);
        assert.strictEqual(stack.has(key), true);
        assert.strictEqual(stack['delete'](key), true);
        assert.strictEqual(stack.has(key), false);
        assert.strictEqual(stack.get(key), undefined);
        assert.strictEqual(stack['delete'](key), false);
        assert.strictEqual(stack.set(key, value), stack);
        assert.strictEqual(stack.has(key), true);
      });

      assert.strictEqual(stack.clear(), undefined);
      assert.ok(
        lodashStable.every(keys, function(key) {
          return !stack.has(key);
        })
      );
    });
  });

  lodashStable.each(['clone', 'cloneDeep'], function(methodName) {
    var func = _[methodName],
      isDeep = methodName == 'cloneDeep';

    lodashStable.forOwn(objects, function(object, key) {
      QUnit.test('`_.' + methodName + '` should clone ' + key, function(assert) {
        assert.expect(2);

        var isEqual = key == 'maps' || key == 'sets' ? _.isEqual : lodashStable.isEqual,
          actual = func(object);

        assert.ok(isEqual(actual, object));

        if (lodashStable.isObject(object)) {
          assert.notStrictEqual(actual, object);
        } else {
          assert.strictEqual(actual, object);
        }
      });
    });

    QUnit.test('`_.' + methodName + '` should clone array buffers', function(assert) {
      assert.expect(2);

      if (ArrayBuffer) {
        var actual = func(arrayBuffer);
        assert.strictEqual(actual.byteLength, arrayBuffer.byteLength);
        assert.notStrictEqual(actual, arrayBuffer);
      } else {
        skipAssert(assert, 2);
      }
    });

    QUnit.test('`_.' + methodName + '` should clone buffers', function(assert) {
      assert.expect(4);

      if (Buffer) {
        var buffer = new Buffer([1, 2]),
          actual = func(buffer);

        assert.strictEqual(actual.byteLength, buffer.byteLength);
        assert.strictEqual(actual.inspect(), buffer.inspect());
        assert.notStrictEqual(actual, buffer);

        buffer[0] = 2;
        assert.strictEqual(actual[0], isDeep ? 2 : 1);
      } else {
        skipAssert(assert, 4);
      }
    });

    QUnit.test('`_.' + methodName + '` should clone `index` and `input` array properties', function(
      assert
    ) {
      assert.expect(2);

      var array = /c/.exec('abcde'),
        actual = func(array);

      assert.strictEqual(actual.index, 2);
      assert.strictEqual(actual.input, 'abcde');
    });

    QUnit.test('`_.' + methodName + '` should clone `lastIndex` regexp property', function(assert) {
      assert.expect(1);

      var regexp = /c/g;
      regexp.exec('abcde');

      assert.strictEqual(func(regexp).lastIndex, 3);
    });

    QUnit.test('`_.' + methodName + '` should clone expando properties', function(assert) {
      assert.expect(1);

      var values = lodashStable.map([false, true, 1, 'a'], function(value) {
        var object = Object(value);
        object.a = 1;
        return object;
      });

      var expected = lodashStable.map(values, alwaysTrue);

      var actual = lodashStable.map(values, function(value) {
        return func(value).a === 1;
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('`_.' + methodName + '` should clone prototype objects', function(assert) {
      assert.expect(2);

      var actual = func(Foo.prototype);

      assert.notOk(actual instanceof Foo);
      assert.deepEqual(actual, {b: 1});
    });

    QUnit.test('`_.' + methodName + '` should set the `[[Prototype]]` of a clone', function(
      assert
    ) {
      assert.expect(1);

      assert.ok(func(new Foo()) instanceof Foo);
    });

    QUnit.test(
      '`_.' +
        methodName +
        '` should set the `[[Prototype]]` of a clone even when the `constructor` is incorrect',
      function(assert) {
        assert.expect(1);

        Foo.prototype.constructor = Object;
        assert.ok(func(new Foo()) instanceof Foo);
        Foo.prototype.constructor = Foo;
      }
    );

    QUnit.test(
      '`_.' +
        methodName +
        '` should ensure `value` constructor is a function before using its `[[Prototype]]`',
      function(assert) {
        assert.expect(1);

        Foo.prototype.constructor = null;
        assert.notOk(func(new Foo()) instanceof Foo);
        Foo.prototype.constructor = Foo;
      }
    );

    QUnit.test(
      '`_.' + methodName + '` should clone properties that shadow those on `Object.prototype`',
      function(assert) {
        assert.expect(2);

        var object = {
          constructor: objectProto.constructor,
          hasOwnProperty: objectProto.hasOwnProperty,
          isPrototypeOf: objectProto.isPrototypeOf,
          propertyIsEnumerable: objectProto.propertyIsEnumerable,
          toLocaleString: objectProto.toLocaleString,
          toString: objectProto.toString,
          valueOf: objectProto.valueOf,
        };

        var actual = func(object);

        assert.deepEqual(actual, object);
        assert.notStrictEqual(actual, object);
      }
    );

    QUnit.test('`_.' + methodName + '` should clone symbol properties', function(assert) {
      assert.expect(3);

      function Foo() {
        this[symbol] = {c: 1};
      }

      if (Symbol) {
        var symbol2 = Symbol('b');
        Foo.prototype[symbol2] = 2;

        var object = {a: {b: new Foo()}};
        object[symbol] = {b: 1};

        var actual = func(object);

        assert.deepEqual(getSymbols(actual.a.b), [symbol]);

        if (isDeep) {
          assert.deepEqual(actual[symbol], object[symbol]);
          assert.deepEqual(actual.a.b[symbol], object.a.b[symbol]);
        } else {
          assert.strictEqual(actual[symbol], object[symbol]);
          assert.strictEqual(actual.a, object.a);
        }
      } else {
        skipAssert(assert, 3);
      }
    });

    QUnit.test('`_.' + methodName + '` should clone symbol objects', function(assert) {
      assert.expect(4);

      if (Symbol) {
        assert.strictEqual(func(symbol), symbol);

        var object = Object(symbol),
          actual = func(object);

        assert.strictEqual(typeof actual, 'object');
        assert.strictEqual(typeof actual.valueOf(), 'symbol');
        assert.notStrictEqual(actual, object);
      } else {
        skipAssert(assert, 4);
      }
    });

    QUnit.test('`_.' + methodName + '` should not clone symbol primitives', function(assert) {
      assert.expect(1);

      if (Symbol) {
        assert.strictEqual(func(symbol), symbol);
      } else {
        skipAssert(assert);
      }
    });

    QUnit.test('`_.' + methodName + '` should not error on DOM elements', function(assert) {
      assert.expect(1);

      if (document) {
        var element = document.createElement('div');

        try {
          assert.deepEqual(func(element), {});
        } catch (e) {
          assert.ok(false, e.message);
        }
      } else {
        skipAssert(assert);
      }
    });

    QUnit.test(
      '`_.' +
        methodName +
        '` should perform a ' +
        (isDeep ? 'deep' : 'shallow') +
        ' clone when used as an iteratee for methods like `_.map`',
      function(assert) {
        assert.expect(2);

        var expected = [{a: [0]}, {b: [1]}],
          actual = lodashStable.map(expected, func);

        assert.deepEqual(actual, expected);

        if (isDeep) {
          assert.ok(
            actual[0] !== expected[0] &&
              actual[0].a !== expected[0].a &&
              actual[1].b !== expected[1].b
          );
        } else {
          assert.ok(
            actual[0] !== expected[0] &&
              actual[0].a === expected[0].a &&
              actual[1].b === expected[1].b
          );
        }
      }
    );

    QUnit.test(
      '`_.' + methodName + '` should create an object from the same realm as `value`',
      function(assert) {
        assert.expect(1);

        var props = [];

        var objects = lodashStable.transform(
          _,
          function(result, value, key) {
            if (
              lodashStable.startsWith(key, '_') &&
              lodashStable.isObject(value) &&
              !lodashStable.isArguments(value) &&
              !lodashStable.isElement(value) &&
              !lodashStable.isFunction(value)
            ) {
              props.push(lodashStable.capitalize(lodashStable.camelCase(key)));
              result.push(value);
            }
          },
          []
        );

        var expected = lodashStable.map(objects, alwaysTrue);

        var actual = lodashStable.map(objects, function(object) {
          var Ctor = object.constructor,
            result = func(object);

          return result !== object && (result instanceof Ctor || !(new Ctor() instanceof Ctor));
        });

        assert.deepEqual(actual, expected, props.join(', '));
      }
    );

    QUnit.test('`_.' + methodName + '` should return a unwrapped value when chaining', function(
      assert
    ) {
      assert.expect(2);

      if (!isNpm) {
        var object = objects.objects,
          actual = _(object)[methodName]();

        assert.deepEqual(actual, object);
        assert.notStrictEqual(actual, object);
      } else {
        skipAssert(assert, 2);
      }
    });

    lodashStable.each(arrayViews, function(type) {
      QUnit.test('`_.' + methodName + '` should clone ' + type + ' values', function(assert) {
        assert.expect(10);

        var Ctor = root[type];

        lodashStable.times(2, function(index) {
          if (Ctor) {
            var buffer = new ArrayBuffer(24),
              view = index ? new Ctor(buffer, 8, 1) : new Ctor(buffer),
              actual = func(view);

            assert.deepEqual(actual, view);
            assert.notStrictEqual(actual, view);
            assert.strictEqual(actual.buffer === view.buffer, !isDeep);
            assert.strictEqual(actual.byteOffset, view.byteOffset);
            assert.strictEqual(actual.length, view.length);
          } else {
            skipAssert(assert, 5);
          }
        });
      });
    });

    lodashStable.forOwn(uncloneable, function(value, key) {
      QUnit.test('`_.' + methodName + '` should not clone ' + key, function(assert) {
        assert.expect(3);

        if (value) {
          var object = {a: value, b: {c: value}},
            actual = func(object),
            expected = typeof value == 'function' && !!value.c ? {c: Foo.c} : {};

          assert.deepEqual(actual, object);
          assert.notStrictEqual(actual, object);
          assert.deepEqual(func(value), expected);
        } else {
          skipAssert(assert, 3);
        }
      });
    });
  });

  lodashStable.each(['cloneWith', 'cloneDeepWith'], function(methodName) {
    var func = _[methodName],
      isDeep = methodName == 'cloneDeepWith';

    QUnit.test('`_.' + methodName + '` should provide the correct `customizer` arguments', function(
      assert
    ) {
      assert.expect(1);

      var argsList = [],
        object = new Foo();

      func(object, function() {
        var length = arguments.length,
          args = slice.call(arguments, 0, length - (length > 1 ? 1 : 0));

        argsList.push(args);
      });

      assert.deepEqual(argsList, isDeep ? [[object], [1, 'a', object]] : [[object]]);
    });

    QUnit.test(
      '`_.' + methodName + '` should handle cloning if `customizer` returns `undefined`',
      function(assert) {
        assert.expect(1);

        var actual = func({a: {b: 'c'}}, noop);
        assert.deepEqual(actual, {a: {b: 'c'}});
      }
    );

    lodashStable.forOwn(uncloneable, function(value, key) {
      QUnit.test(
        '`_.' + methodName + '` should work with a `customizer` callback and ' + key,
        function(assert) {
          assert.expect(4);

          var customizer = function(value) {
            return lodashStable.isPlainObject(value) ? undefined : value;
          };

          var actual = func(value, customizer);

          assert.deepEqual(actual, value);
          assert.strictEqual(actual, value);

          var object = {a: value, b: {c: value}};
          actual = func(object, customizer);

          assert.deepEqual(actual, object);
          assert.notStrictEqual(actual, object);
        }
      );
    });
  });
})(1, 2, 3);

//--------------------

QUnit.module('lodash.compact');

(function() {
  var largeArray = lodashStable.range(LARGE_ARRAY_SIZE).concat(null);

  QUnit.test('should filter falsey values', function(assert) {
    assert.expect(1);

    var array = ['0', '1', '2'];
    assert.deepEqual(_.compact(falsey.concat(array)), array);
  });

  QUnit.test('should work when in-between lazy operators', function(assert) {
    assert.expect(2);

    if (!isNpm) {
      var actual = _(falsey)
        .thru(_.slice)
        .compact()
        .thru(_.slice)
        .value();
      assert.deepEqual(actual, []);

      actual = _(falsey)
        .thru(_.slice)
        .push(true, 1)
        .compact()
        .push('a')
        .value();
      assert.deepEqual(actual, [true, 1, 'a']);
    } else {
      skipAssert(assert, 2);
    }
  });

  QUnit.test('should work in a lazy sequence', function(assert) {
    assert.expect(1);

    if (!isNpm) {
      var actual = _(largeArray)
        .slice(1)
        .compact()
        .reverse()
        .take()
        .value();
      assert.deepEqual(actual, _.take(_.compact(_.slice(largeArray, 1)).reverse()));
    } else {
      skipAssert(assert);
    }
  });

  QUnit.test('should work in a lazy sequence with a custom `_.iteratee`', function(assert) {
    assert.expect(1);

    if (!isModularize) {
      var iteratee = _.iteratee,
        pass = false;

      _.iteratee = identity;

      try {
        var actual = _(largeArray)
          .slice(1)
          .compact()
          .value();
        pass = lodashStable.isEqual(actual, _.compact(_.slice(largeArray, 1)));
      } catch (e) {
        console.log(e);
      }

      assert.ok(pass);
      _.iteratee = iteratee;
    } else {
      skipAssert(assert);
    }
  });
})();

//----------------

QUnit.module('lodash.curry');

(function() {
  function fn(a, b, c, d) {
    return slice.call(arguments);
  }

  QUnit.test('should curry based on the number of arguments given', function(assert) {
    assert.expect(3);

    var curried = _.curry(fn),
      expected = [1, 2, 3, 4];

    assert.deepEqual(curried(1)(2)(3)(4), expected);
    assert.deepEqual(curried(1, 2)(3, 4), expected);
    assert.deepEqual(curried(1, 2, 3, 4), expected);
  });

  QUnit.test('should allow specifying `arity`', function(assert) {
    assert.expect(3);

    var curried = _.curry(fn, 3),
      expected = [1, 2, 3];

    assert.deepEqual(curried(1)(2, 3), expected);
    assert.deepEqual(curried(1, 2)(3), expected);
    assert.deepEqual(curried(1, 2, 3), expected);
  });

  QUnit.test('should coerce `arity` to an integer', function(assert) {
    assert.expect(2);

    var values = ['0', 0.6, 'xyz'],
      expected = lodashStable.map(values, alwaysEmptyArray);

    var actual = lodashStable.map(values, function(arity) {
      return _.curry(fn, arity)();
    });

    assert.deepEqual(actual, expected);
    assert.deepEqual(_.curry(fn, '2')(1)(2), [1, 2]);
  });

  QUnit.test('should support placeholders', function(assert) {
    assert.expect(4);

    var curried = _.curry(fn),
      ph = curried.placeholder;

    assert.deepEqual(curried(1)(ph, 3)(ph, 4)(2), [1, 2, 3, 4]);
    assert.deepEqual(curried(ph, 2)(1)(ph, 4)(3), [1, 2, 3, 4]);
    assert.deepEqual(curried(ph, ph, 3)(ph, 2)(ph, 4)(1), [1, 2, 3, 4]);
    assert.deepEqual(curried(ph, ph, ph, 4)(ph, ph, 3)(ph, 2)(1), [1, 2, 3, 4]);
  });

  QUnit.test('should persist placeholders', function(assert) {
    assert.expect(1);

    var curried = _.curry(fn),
      ph = curried.placeholder,
      actual = curried(ph, ph, ph, 'd')('a')(ph)('b')('c');

    assert.deepEqual(actual, ['a', 'b', 'c', 'd']);
  });

  QUnit.test('should use `_.placeholder` when set', function(assert) {
    assert.expect(1);

    if (!isModularize) {
      var curried = _.curry(fn),
        _ph = (_.placeholder = {}),
        ph = curried.placeholder;

      assert.deepEqual(curried(1)(_ph, 3)(ph, 4), [1, ph, 3, 4]);
      delete _.placeholder;
    } else {
      skipAssert(assert);
    }
  });

  QUnit.test('should provide additional arguments after reaching the target arity', function(
    assert
  ) {
    assert.expect(3);

    var curried = _.curry(fn, 3);
    assert.deepEqual(curried(1)(2, 3, 4), [1, 2, 3, 4]);
    assert.deepEqual(curried(1, 2)(3, 4, 5), [1, 2, 3, 4, 5]);
    assert.deepEqual(curried(1, 2, 3, 4, 5, 6), [1, 2, 3, 4, 5, 6]);
  });

  QUnit.test('should create a function with a `length` of `0`', function(assert) {
    assert.expect(6);

    lodashStable.times(2, function(index) {
      var curried = index ? _.curry(fn, 4) : _.curry(fn);
      assert.strictEqual(curried.length, 0);
      assert.strictEqual(curried(1).length, 0);
      assert.strictEqual(curried(1, 2).length, 0);
    });
  });

  QUnit.test('should ensure `new curried` is an instance of `func`', function(assert) {
    assert.expect(2);

    function Foo(value) {
      return value && object;
    }

    var curried = _.curry(Foo),
      object = {};

    assert.ok(new curried(false) instanceof Foo);
    assert.strictEqual(new curried(true), object);
  });

  QUnit.test('should not set a `this` binding', function(assert) {
    assert.expect(9);

    var fn = function(a, b, c) {
      var value = this || {};
      return [value[a], value[b], value[c]];
    };

    var object = {a: 1, b: 2, c: 3},
      expected = [1, 2, 3];

    assert.deepEqual(_.curry(_.bind(fn, object), 3)('a')('b')('c'), expected);
    assert.deepEqual(_.curry(_.bind(fn, object), 3)('a', 'b')('c'), expected);
    assert.deepEqual(_.curry(_.bind(fn, object), 3)('a', 'b', 'c'), expected);

    assert.deepEqual(_.bind(_.curry(fn), object)('a')('b')('c'), Array(3));
    assert.deepEqual(_.bind(_.curry(fn), object)('a', 'b')('c'), Array(3));
    assert.deepEqual(_.bind(_.curry(fn), object)('a', 'b', 'c'), expected);

    object.curried = _.curry(fn);
    assert.deepEqual(object.curried('a')('b')('c'), Array(3));
    assert.deepEqual(object.curried('a', 'b')('c'), Array(3));
    assert.deepEqual(object.curried('a', 'b', 'c'), expected);
  });

  QUnit.test('should work with partialed methods', function(assert) {
    assert.expect(2);

    var curried = _.curry(fn),
      expected = [1, 2, 3, 4];

    var a = _.partial(curried, 1),
      b = _.bind(a, null, 2),
      c = _.partialRight(b, 4),
      d = _.partialRight(b(3), 4);

    assert.deepEqual(c(3), expected);
    assert.deepEqual(d(), expected);
  });
})();

//--------------

QUnit.module('curry methods');

lodashStable.each(['curry', 'curryRight'], function(methodName) {
  var func = _[methodName],
    fn = function(a, b) {
      return slice.call(arguments);
    },
    isCurry = methodName == 'curry';

  QUnit.test(
    '`_.' + methodName + '` should not error on functions with the same name as lodash methods',
    function(assert) {
      assert.expect(1);

      function run(a, b) {
        return a + b;
      }

      var curried = func(run);

      try {
        var actual = curried(1)(2);
      } catch (e) {}

      assert.strictEqual(actual, 3);
    }
  );

  QUnit.test('`_.' + methodName + '` should work as an iteratee for methods like `_.map`', function(
    assert
  ) {
    assert.expect(2);

    var array = [fn, fn, fn],
      object = {a: fn, b: fn, c: fn};

    lodashStable.each([array, object], function(collection) {
      var curries = lodashStable.map(collection, func),
        expected = lodashStable.map(
          collection,
          lodashStable.constant(isCurry ? ['a', 'b'] : ['b', 'a'])
        );

      var actual = lodashStable.map(curries, function(curried) {
        return curried('a')('b');
      });

      assert.deepEqual(actual, expected);
    });
  });

  QUnit.test(
    '`_.' + methodName + '` should work for function names that shadow those on `Object.prototype`',
    function(assert) {
      assert.expect(1);

      var curried = _.curry(function hasOwnProperty(a, b, c) {
        return [a, b, c];
      });

      var expected = [1, 2, 3];

      assert.deepEqual(curried(1)(2)(3), expected);
    }
  );
});

//-----------

QUnit.module('lodash.debounce');

(function() {
  QUnit.test('should debounce a function', function(assert) {
    assert.expect(6);

    var done = assert.async();

    var callCount = 0;

    var debounced = _.debounce(function(value) {
      ++callCount;
      return value;
    }, 32);

    // Leading should not fire.
    var actual = [debounced(0), debounced(1), debounced(2)];
    assert.deepEqual(actual, [undefined, undefined, undefined]);
    assert.strictEqual(callCount, 0);

    setTimeout(function() {
      // Trailing should fire by now.
      assert.strictEqual(callCount, 1);

      // Do it again.
      var actual = [debounced(3), debounced(4), debounced(5)];

      // Previous result.
      assert.deepEqual(actual, [2, 2, 2]);
      assert.strictEqual(callCount, 1);
    }, 128);

    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      done();
    }, 256);
  });

  QUnit.test('subsequent debounced calls return the last `func` result', function(assert) {
    assert.expect(2);

    var done = assert.async();

    var debounced = _.debounce(identity, 32);
    debounced('x');

    setTimeout(function() {
      assert.notEqual(debounced('y'), 'y');
    }, 64);

    setTimeout(function() {
      assert.notEqual(debounced('z'), 'z');
      done();
    }, 128);
  });

  QUnit.test('subsequent "immediate" debounced calls return the last `func` result', function(
    assert
  ) {
    assert.expect(2);

    var done = assert.async();

    var debounced = _.debounce(identity, 32, {leading: true, trailing: false}),
      result = [debounced('x'), debounced('y')];

    assert.deepEqual(result, ['x', 'x']);

    setTimeout(function() {
      var result = [debounced('a'), debounced('b')];
      assert.deepEqual(result, ['a', 'a']);
      done();
    }, 64);
  });

  QUnit.test('should apply default options', function(assert) {
    assert.expect(2);

    var done = assert.async();

    var callCount = 0;

    var debounced = _.debounce(
      function(value) {
        callCount++;
        return value;
      },
      32,
      {}
    );

    assert.strictEqual(debounced('a'), undefined);

    setTimeout(function() {
      assert.strictEqual(callCount, 1);
      done();
    }, 64);
  });

  QUnit.test('should support a `leading` option', function(assert) {
    assert.expect(5);

    var done = assert.async();

    var callCounts = [0, 0];

    var withLeading = _.debounce(
      function(value) {
        callCounts[0]++;
        return value;
      },
      32,
      {leading: true}
    );

    assert.strictEqual(withLeading('a'), 'a');

    var withoutLeading = _.debounce(identity, 32, {leading: false});
    assert.strictEqual(withoutLeading('a'), undefined);

    var withLeadingAndTrailing = _.debounce(
      function() {
        callCounts[1]++;
      },
      32,
      {leading: true}
    );

    withLeadingAndTrailing();
    withLeadingAndTrailing();

    assert.strictEqual(callCounts[1], 1);

    setTimeout(function() {
      assert.deepEqual(callCounts, [1, 2]);

      withLeading('a');
      assert.strictEqual(callCounts[0], 2);

      done();
    }, 64);
  });

  QUnit.test('should support a `trailing` option', function(assert) {
    assert.expect(4);

    var done = assert.async();

    var withCount = 0,
      withoutCount = 0;

    var withTrailing = _.debounce(
      function(value) {
        withCount++;
        return value;
      },
      32,
      {trailing: true}
    );

    var withoutTrailing = _.debounce(
      function(value) {
        withoutCount++;
        return value;
      },
      32,
      {trailing: false}
    );

    assert.strictEqual(withTrailing('a'), undefined);
    assert.strictEqual(withoutTrailing('a'), undefined);

    setTimeout(function() {
      assert.strictEqual(withCount, 1);
      assert.strictEqual(withoutCount, 0);
      done();
    }, 64);
  });

  QUnit.test('should support a `maxWait` option', function(assert) {
    assert.expect(6);

    var done = assert.async();

    var callCount = 0;

    var debounced = _.debounce(
      function(value) {
        ++callCount;
        return value;
      },
      32,
      {maxWait: 64}
    );

    // Leading should not fire.
    var actual = [debounced(0), debounced(1), debounced(2)];
    assert.deepEqual(actual, [undefined, undefined, undefined]);
    assert.strictEqual(callCount, 0);

    setTimeout(function() {
      // Trailing should fire by now.
      assert.strictEqual(callCount, 1);

      // Do it again.
      var actual = [debounced(3), debounced(4), debounced(5)];

      // Previous result.
      assert.deepEqual(actual, [2, 2, 2]);
      assert.strictEqual(callCount, 1);
    }, 128);

    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      done();
    }, 256);
  });

  QUnit.test('should support `maxWait` in a tight loop', function(assert) {
    assert.expect(1);

    var done = assert.async();

    var limit = argv || isPhantom ? 1000 : 320,
      withCount = 0,
      withoutCount = 0;

    var withMaxWait = _.debounce(
      function() {
        withCount++;
      },
      64,
      {maxWait: 128}
    );

    var withoutMaxWait = _.debounce(function() {
      withoutCount++;
    }, 96);

    var start = +new Date();
    while (new Date() - start < limit) {
      withMaxWait();
      withoutMaxWait();
    }
    var actual = [Boolean(withoutCount), Boolean(withCount)];

    setTimeout(function() {
      assert.deepEqual(actual, [false, true]);
      done();
    }, 1);
  });

  QUnit.test(
    'should queue a trailing call for subsequent debounced calls after `maxWait`',
    function(assert) {
      assert.expect(1);

      var done = assert.async();

      var callCount = 0;

      var debounced = _.debounce(
        function() {
          ++callCount;
        },
        64,
        {maxWait: 64}
      );

      debounced();

      lodashStable.times(20, function(index) {
        setTimeout(debounced, 54 + index);
      });

      setTimeout(function() {
        assert.strictEqual(callCount, 2);
        done();
      }, 160);
    }
  );

  QUnit.test('should cancel `maxDelayed` when `delayed` is invoked', function(assert) {
    assert.expect(2);

    var done = assert.async();

    var callCount = 0;

    var debounced = _.debounce(
      function() {
        callCount++;
      },
      32,
      {maxWait: 64}
    );

    debounced();

    setTimeout(function() {
      debounced();
      assert.strictEqual(callCount, 1);
    }, 128);

    setTimeout(function() {
      assert.strictEqual(callCount, 2);
      done();
    }, 192);
  });

  QUnit.test(
    'should invoke the `trailing` call with the correct arguments and `this` binding',
    function(assert) {
      assert.expect(2);

      var done = assert.async();

      var actual,
        callCount = 0,
        object = {};

      var debounced = _.debounce(
        function(value) {
          actual = [this];
          push.apply(actual, arguments);
          return ++callCount != 2;
        },
        32,
        {leading: true, maxWait: 64}
      );

      while (true) {
        if (!debounced.call(object, 'a')) {
          break;
        }
      }
      setTimeout(function() {
        assert.strictEqual(callCount, 2);
        assert.deepEqual(actual, [object, 'a']);
        done();
      }, 64);
    }
  );
})();

//-----------------

QUnit.module('flatten methods');

(function() {
  var args = arguments,
    array = [1, [2, [3, [4]], 5]];

  QUnit.test('should flatten `arguments` objects', function(assert) {
    assert.expect(3);

    var array = [args, [args]];

    assert.deepEqual(_.flatten(array), [1, 2, 3, args]);
    assert.deepEqual(_.flattenDeep(array), [1, 2, 3, 1, 2, 3]);
    assert.deepEqual(_.flattenDepth(array, 2), [1, 2, 3, 1, 2, 3]);
  });

  QUnit.test('should treat sparse arrays as dense', function(assert) {
    assert.expect(6);

    var array = [[1, 2, 3], Array(3)],
      expected = [1, 2, 3];

    expected.push(undefined, undefined, undefined);

    lodashStable.each([_.flatten(array), _.flattenDeep(array), _.flattenDepth(array)], function(
      actual
    ) {
      assert.deepEqual(actual, expected);
      assert.ok('4' in actual);
    });
  });

  QUnit.test('should work with extremely large arrays', function(assert) {
    assert.expect(3);

    lodashStable.times(3, function(index) {
      var expected = Array(5e5);
      try {
        var func = _.flatten;
        if (index == 1) {
          func = _.flattenDeep;
        } else if (index == 2) {
          func = _.flattenDepth;
        }
        assert.deepEqual(func([expected]), expected);
      } catch (e) {
        assert.ok(false, e.message);
      }
    });
  });

  QUnit.test('should work with empty arrays', function(assert) {
    assert.expect(3);

    var array = [[], [[]], [[], [[[]]]]];

    assert.deepEqual(_.flatten(array), [[], [], [[[]]]]);
    assert.deepEqual(_.flattenDeep(array), []);
    assert.deepEqual(_.flattenDepth(array, 2), [[[]]]);
  });

  QUnit.test('should support flattening of nested arrays', function(assert) {
    assert.expect(3);

    assert.deepEqual(_.flatten(array), [1, 2, [3, [4]], 5]);
    assert.deepEqual(_.flattenDeep(array), [1, 2, 3, 4, 5]);
    assert.deepEqual(_.flattenDepth(array, 2), [1, 2, 3, [4], 5]);
  });

  QUnit.test('should return an empty array for non array-like objects', function(assert) {
    assert.expect(3);

    var expected = [],
      nonArray = {a: 1};

    assert.deepEqual(_.flatten(nonArray), expected);
    assert.deepEqual(_.flattenDeep(nonArray), expected);
    assert.deepEqual(_.flattenDepth(nonArray, 2), expected);
  });

  QUnit.test('should return a wrapped value when chaining', function(assert) {
    assert.expect(6);

    if (!isNpm) {
      var wrapped = _(array),
        actual = wrapped.flatten();

      assert.ok(actual instanceof _);
      assert.deepEqual(actual.value(), [1, 2, [3, [4]], 5]);

      actual = wrapped.flattenDeep();

      assert.ok(actual instanceof _);
      assert.deepEqual(actual.value(), [1, 2, 3, 4, 5]);

      actual = wrapped.flattenDepth(2);

      assert.ok(actual instanceof _);
      assert.deepEqual(actual.value(), [1, 2, 3, [4], 5]);
    } else {
      skipAssert(assert, 6);
    }
  });
})(1, 2, 3);

//--------------------

QUnit.module('lodash.groupBy');

(function() {
  var array = [6.1, 4.2, 6.3];

  QUnit.test('should transform keys by `iteratee`', function(assert) {
    assert.expect(1);

    var actual = _.groupBy(array, Math.floor);
    assert.deepEqual(actual, {'4': [4.2], '6': [6.1, 6.3]});
  });

  QUnit.test('should use `_.identity` when `iteratee` is nullish', function(assert) {
    assert.expect(1);

    var array = [6, 4, 6],
      values = [, null, undefined],
      expected = lodashStable.map(values, lodashStable.constant({'4': [4], '6': [6, 6]}));

    var actual = lodashStable.map(values, function(value, index) {
      return index ? _.groupBy(array, value) : _.groupBy(array);
    });

    assert.deepEqual(actual, expected);
  });

  QUnit.test('should work with `_.property` shorthands', function(assert) {
    assert.expect(1);

    var actual = _.groupBy(['one', 'two', 'three'], 'length');
    assert.deepEqual(actual, {'3': ['one', 'two'], '5': ['three']});
  });

  QUnit.test('should only add values to own, not inherited, properties', function(assert) {
    assert.expect(2);

    var actual = _.groupBy(array, function(n) {
      return Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor';
    });

    assert.deepEqual(actual.constructor, [4.2]);
    assert.deepEqual(actual.hasOwnProperty, [6.1, 6.3]);
  });

  QUnit.test('should work with a number for `iteratee`', function(assert) {
    assert.expect(2);

    var array = [[1, 'a'], [2, 'a'], [2, 'b']];

    assert.deepEqual(_.groupBy(array, 0), {'1': [[1, 'a']], '2': [[2, 'a'], [2, 'b']]});
    assert.deepEqual(_.groupBy(array, 1), {a: [[1, 'a'], [2, 'a']], b: [[2, 'b']]});
  });

  QUnit.test('should work with an object for `collection`', function(assert) {
    assert.expect(1);

    var actual = _.groupBy({a: 6.1, b: 4.2, c: 6.3}, Math.floor);
    assert.deepEqual(actual, {'4': [4.2], '6': [6.1, 6.3]});
  });

  QUnit.test('should work in a lazy sequence', function(assert) {
    assert.expect(1);

    if (!isNpm) {
      var array = lodashStable
        .range(LARGE_ARRAY_SIZE)
        .concat(
          lodashStable.range(Math.floor(LARGE_ARRAY_SIZE / 2), LARGE_ARRAY_SIZE),
          lodashStable.range(Math.floor(LARGE_ARRAY_SIZE / 1.5), LARGE_ARRAY_SIZE)
        );

      var iteratee = function(value) {
          value.push(value[0]);
          return value;
        },
        predicate = function(value) {
          return isEven(value[0]);
        },
        actual = _(array)
          .groupBy()
          .map(iteratee)
          .filter(predicate)
          .take()
          .value();

      assert.deepEqual(
        actual,
        _.take(_.filter(lodashStable.map(_.groupBy(array), iteratee), predicate))
      );
    } else {
      skipAssert(assert);
    }
  });
})();

//-----------

QUnit.module('intersection methods');

lodashStable.each(['intersection', 'intersectionBy', 'intersectionWith'], function(methodName) {
  var args = (function() {
      return arguments;
    })(1, 2, 3),
    func = _[methodName];

  QUnit.test('`_.' + methodName + '` should return the intersection of two arrays', function(
    assert
  ) {
    assert.expect(2);

    var actual = func([1, 3, 2], [5, 2, 1, 4]);
    assert.deepEqual(actual, [1, 2]);

    actual = func([5, 2, 1, 4], [1, 3, 2]);
    assert.deepEqual(actual, [2, 1]);
  });

  QUnit.test('`_.' + methodName + '` should return the intersection of multiple arrays', function(
    assert
  ) {
    assert.expect(2);

    var actual = func([1, 3, 2], [5, 2, 1, 4], [2, 1]);
    assert.deepEqual(actual, [1, 2]);

    actual = func([5, 2, 1, 4], [2, 1], [1, 3, 2]);
    assert.deepEqual(actual, [2, 1]);
  });

  QUnit.test('`_.' + methodName + '` should return an array of unique values', function(assert) {
    assert.expect(1);

    var actual = func([1, 1, 3, 2, 2], [5, 2, 2, 1, 4], [2, 1, 1]);
    assert.deepEqual(actual, [1, 2]);
  });

  QUnit.test('`_.' + methodName + '` should match `NaN`', function(assert) {
    assert.expect(1);

    var actual = func([1, NaN, 3], [NaN, 5, NaN]);
    assert.deepEqual(actual, [NaN]);
  });

  QUnit.test('`_.' + methodName + '` should work with large arrays of objects', function(assert) {
    assert.expect(2);

    var object = {},
      largeArray = lodashStable.times(LARGE_ARRAY_SIZE, lodashStable.constant(object));

    assert.deepEqual(func([object], largeArray), [object]);
    assert.deepEqual(func(lodashStable.range(LARGE_ARRAY_SIZE), [1]), [1]);
  });

  QUnit.test('`_.' + methodName + '` should work with large arrays of `NaN`', function(assert) {
    assert.expect(1);

    var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, alwaysNaN);
    assert.deepEqual(func([1, NaN, 3], largeArray), [NaN]);
  });

  QUnit.test('`_.' + methodName + '` should work with `arguments` objects', function(assert) {
    assert.expect(2);

    var array = [0, 1, null, 3],
      expected = [1, 3];

    assert.deepEqual(func(array, args), expected);
    assert.deepEqual(func(args, array), expected);
  });

  QUnit.test('`_.' + methodName + '` should work with a single array', function(assert) {
    assert.expect(1);

    var actual = func([1, 1, 3, 2, 2]);
    assert.deepEqual(actual, [1, 3, 2]);
  });

  QUnit.test(
    '`_.' +
      methodName +
      '` should treat values that are not arrays or `arguments` objects as empty',
    function(assert) {
      assert.expect(3);

      var array = [0, 1, null, 3];
      assert.deepEqual(func(array, 3, {'0': 1}, null), []);
      assert.deepEqual(func(null, array, null, [2, 3]), []);
      assert.deepEqual(func(array, null, args, null), []);
    }
  );

  QUnit.test('`_.' + methodName + '` should return a wrapped value when chaining', function(
    assert
  ) {
    assert.expect(2);

    if (!isNpm) {
      var wrapped = _([1, 3, 2])[methodName]([5, 2, 1, 4]);
      assert.ok(wrapped instanceof _);
      assert.deepEqual(wrapped.value(), [1, 2]);
    } else {
      skipAssert(assert, 2);
    }
  });
});

//----------------

QUnit.module('lodash.isEqualWith');

(function() {
  QUnit.test('should provide the correct `customizer` arguments', function(assert) {
    assert.expect(1);

    var argsList = [],
      object1 = {a: [1, 2], b: null},
      object2 = {a: [1, 2], b: null};

    object1.b = object2;
    object2.b = object1;

    var expected = [
      [object1, object2],
      [object1.a, object2.a, 'a', object1, object2],
      [object1.a[0], object2.a[0], 0, object1.a, object2.a],
      [object1.a[1], object2.a[1], 1, object1.a, object2.a],
      [object1.b, object2.b, 'b', object1.b, object2.b],
      [object1.b.a, object2.b.a, 'a', object1.b, object2.b],
      [object1.b.a[0], object2.b.a[0], 0, object1.b.a, object2.b.a],
      [object1.b.a[1], object2.b.a[1], 1, object1.b.a, object2.b.a],
      [object1.b.b, object2.b.b, 'b', object1.b.b, object2.b.b],
    ];

    _.isEqualWith(object1, object2, function(assert) {
      var length = arguments.length,
        args = slice.call(arguments, 0, length - (length > 2 ? 1 : 0));

      argsList.push(args);
    });

    assert.deepEqual(argsList, expected);
  });

  QUnit.test('should handle comparisons if `customizer` returns `undefined`', function(assert) {
    assert.expect(3);

    assert.strictEqual(_.isEqualWith('a', 'a', noop), true);
    assert.strictEqual(_.isEqualWith(['a'], ['a'], noop), true);
    assert.strictEqual(_.isEqualWith({'0': 'a'}, {'0': 'a'}, noop), true);
  });

  QUnit.test('should not handle comparisons if `customizer` returns `true`', function(assert) {
    assert.expect(3);

    var customizer = function(value) {
      return _.isString(value) || undefined;
    };

    assert.strictEqual(_.isEqualWith('a', 'b', customizer), true);
    assert.strictEqual(_.isEqualWith(['a'], ['b'], customizer), true);
    assert.strictEqual(_.isEqualWith({'0': 'a'}, {'0': 'b'}, customizer), true);
  });

  QUnit.test('should not handle comparisons if `customizer` returns `false`', function(assert) {
    assert.expect(3);

    var customizer = function(value) {
      return _.isString(value) ? false : undefined;
    };

    assert.strictEqual(_.isEqualWith('a', 'a', customizer), false);
    assert.strictEqual(_.isEqualWith(['a'], ['a'], customizer), false);
    assert.strictEqual(_.isEqualWith({'0': 'a'}, {'0': 'a'}, customizer), false);
  });

  QUnit.test('should return a boolean value even if `customizer` does not', function(assert) {
    assert.expect(2);

    var actual = _.isEqualWith('a', 'b', alwaysC);
    assert.strictEqual(actual, true);

    var values = _.without(falsey, undefined),
      expected = lodashStable.map(values, alwaysFalse);

    actual = [];
    lodashStable.each(values, function(value) {
      actual.push(_.isEqualWith('a', 'a', lodashStable.constant(value)));
    });

    assert.deepEqual(actual, expected);
  });

  QUnit.test('should ensure `customizer` is a function', function(assert) {
    assert.expect(1);

    var array = [1, 2, 3],
      eq = _.partial(_.isEqualWith, array),
      actual = lodashStable.map([array, [1, 0, 3]], eq);

    assert.deepEqual(actual, [true, false]);
  });

  QUnit.test('should call `customizer` for values maps and sets', function(assert) {
    assert.expect(2);

    var value = {a: {b: 2}};

    if (Map) {
      var map1 = new Map();
      map1.set('a', value);

      var map2 = new Map();
      map2.set('a', value);
    }
    if (Set) {
      var set1 = new Set();
      set1.add(value);

      var set2 = new Set();
      set2.add(value);
    }
    lodashStable.each([[map1, map2], [set1, set2]], function(pair, index) {
      if (pair[0]) {
        var argsList = [],
          array = _.toArray(pair[0]);

        var expected = [
          [pair[0], pair[1]],
          [array[0], array[0], 0, array, array],
          [array[0][0], array[0][0], 0, array[0], array[0]],
          [array[0][1], array[0][1], 1, array[0], array[0]],
        ];

        if (index) {
          expected.length = 2;
        }
        _.isEqualWith(pair[0], pair[1], function() {
          var length = arguments.length,
            args = slice.call(arguments, 0, length - (length > 2 ? 1 : 0));

          argsList.push(args);
        });

        assert.deepEqual(argsList, expected, index ? 'Set' : 'Map');
      } else {
        skipAssert(assert);
      }
    });
  });
})();

//----------------

QUnit.module('lodash.last');

(function() {
  var array = [1, 2, 3, 4];

  QUnit.test('should return the last element', function(assert) {
    assert.expect(1);

    assert.strictEqual(_.last(array), 4);
  });

  QUnit.test('should return `undefined` when querying empty arrays', function(assert) {
    assert.expect(1);

    var array = [];
    array['-1'] = 1;

    assert.strictEqual(_.last([]), undefined);
  });

  QUnit.test('should work as an iteratee for methods like `_.map`', function(assert) {
    assert.expect(1);

    var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      actual = lodashStable.map(array, _.last);

    assert.deepEqual(actual, [3, 6, 9]);
  });

  QUnit.test('should return an unwrapped value when implicitly chaining', function(assert) {
    assert.expect(1);

    if (!isNpm) {
      assert.strictEqual(_(array).last(), 4);
    } else {
      skipAssert(assert);
    }
  });

  QUnit.test('should return a wrapped value when explicitly chaining', function(assert) {
    assert.expect(1);

    if (!isNpm) {
      assert.ok(
        _(array)
          .chain()
          .last() instanceof _
      );
    } else {
      skipAssert(assert);
    }
  });

  QUnit.test('should not execute immediately when explicitly chaining', function(assert) {
    assert.expect(1);

    if (!isNpm) {
      var wrapped = _(array)
        .chain()
        .last();
      assert.strictEqual(wrapped.__wrapped__, array);
    } else {
      skipAssert(assert);
    }
  });

  QUnit.test('should work in a lazy sequence', function(assert) {
    assert.expect(2);

    if (!isNpm) {
      var largeArray = lodashStable.range(LARGE_ARRAY_SIZE),
        smallArray = array;

      lodashStable.times(2, function(index) {
        var array = index ? largeArray : smallArray,
          wrapped = _(array).filter(isEven);

        assert.strictEqual(wrapped.last(), _.last(_.filter(array, isEven)));
      });
    } else {
      skipAssert(assert, 2);
    }
  });
})();

//-------------

QUnit.module('lodash.map');

(function() {
  var array = [1, 2];

  QUnit.test('should map values in `collection` to a new array', function(assert) {
    assert.expect(2);

    var object = {a: 1, b: 2},
      expected = ['1', '2'];

    assert.deepEqual(_.map(array, String), expected);
    assert.deepEqual(_.map(object, String), expected);
  });

  QUnit.test('should work with `_.property` shorthands', function(assert) {
    assert.expect(1);

    var objects = [{a: 'x'}, {a: 'y'}];
    assert.deepEqual(_.map(objects, 'a'), ['x', 'y']);
  });

  QUnit.test('should iterate over own string keyed properties of objects', function(assert) {
    assert.expect(1);

    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    var actual = _.map(new Foo(), identity);
    assert.deepEqual(actual, [1]);
  });

  QUnit.test('should use `_.identity` when `iteratee` is nullish', function(assert) {
    assert.expect(2);

    var object = {a: 1, b: 2},
      values = [, null, undefined],
      expected = lodashStable.map(values, lodashStable.constant([1, 2]));

    lodashStable.each([array, object], function(collection) {
      var actual = lodashStable.map(values, function(value, index) {
        return index ? _.map(collection, value) : _.map(collection);
      });

      assert.deepEqual(actual, expected);
    });
  });

  QUnit.test('should accept a falsey `collection` argument', function(assert) {
    assert.expect(1);

    var expected = lodashStable.map(falsey, alwaysEmptyArray);

    var actual = lodashStable.map(falsey, function(collection, index) {
      try {
        return index ? _.map(collection) : _.map();
      } catch (e) {}
    });

    assert.deepEqual(actual, expected);
  });

  QUnit.test('should treat number values for `collection` as empty', function(assert) {
    assert.expect(1);

    assert.deepEqual(_.map(1), []);
  });

  QUnit.test('should treat a nodelist as an array-like object', function(assert) {
    assert.expect(1);

    if (document) {
      var actual = _.map(document.getElementsByTagName('body'), function(element) {
        return element.nodeName.toLowerCase();
      });

      assert.deepEqual(actual, ['body']);
    } else {
      skipAssert(assert);
    }
  });

  QUnit.test('should work with objects with non-number length properties', function(assert) {
    assert.expect(1);

    var value = {value: 'x'},
      object = {length: {value: 'x'}};

    assert.deepEqual(_.map(object, identity), [value]);
  });

  QUnit.test('should return a wrapped value when chaining', function(assert) {
    assert.expect(1);

    if (!isNpm) {
      assert.ok(_(array).map(noop) instanceof _);
    } else {
      skipAssert(assert);
    }
  });

  QUnit.test('should provide the correct `predicate` arguments in a lazy sequence', function(
    assert
  ) {
    assert.expect(5);

    if (!isNpm) {
      var args,
        array = lodashStable.range(LARGE_ARRAY_SIZE + 1),
        expected = [1, 0, _.map(array.slice(1), square)];

      _(array)
        .slice(1)
        .map(function(value, index, array) {
          args || (args = slice.call(arguments));
        })
        .value();

      assert.deepEqual(args, [1, 0, array.slice(1)]);

      args = undefined;
      _(array)
        .slice(1)
        .map(square)
        .map(function(value, index, array) {
          args || (args = slice.call(arguments));
        })
        .value();

      assert.deepEqual(args, expected);

      args = undefined;
      _(array)
        .slice(1)
        .map(square)
        .map(function(value, index) {
          args || (args = slice.call(arguments));
        })
        .value();

      assert.deepEqual(args, expected);

      args = undefined;
      _(array)
        .slice(1)
        .map(square)
        .map(function(value) {
          args || (args = slice.call(arguments));
        })
        .value();

      assert.deepEqual(args, [1]);

      args = undefined;
      _(array)
        .slice(1)
        .map(square)
        .map(function() {
          args || (args = slice.call(arguments));
        })
        .value();

      assert.deepEqual(args, expected);
    } else {
      skipAssert(assert, 5);
    }
  });
})();

//-----------

QUnit.module('lodash.mapValues');

(function() {
  var array = [1, 2],
    object = {a: 1, b: 2};

  QUnit.test('should map values in `object` to a new object', function(assert) {
    assert.expect(1);

    var actual = _.mapValues(object, String);
    assert.deepEqual(actual, {a: '1', b: '2'});
  });

  QUnit.test('should treat arrays like objects', function(assert) {
    assert.expect(1);

    var actual = _.mapValues(array, String);
    assert.deepEqual(actual, {'0': '1', '1': '2'});
  });

  QUnit.test('should work with `_.property` shorthands', function(assert) {
    assert.expect(1);

    var actual = _.mapValues({a: {b: 1}}, 'b');
    assert.deepEqual(actual, {a: 1});
  });

  QUnit.test('should use `_.identity` when `iteratee` is nullish', function(assert) {
    assert.expect(1);

    var object = {a: 1, b: 2},
      values = [, null, undefined],
      expected = lodashStable.map(values, lodashStable.constant([true, false]));

    var actual = lodashStable.map(values, function(value, index) {
      var result = index ? _.mapValues(object, value) : _.mapValues(object);
      return [lodashStable.isEqual(result, object), result === object];
    });

    assert.deepEqual(actual, expected);
  });
})();

//--------------

QUnit.module('lodash.mapKeys and lodash.mapValues');

lodashStable.each(['mapKeys', 'mapValues'], function(methodName) {
  var array = [1, 2],
    func = _[methodName],
    object = {a: 1, b: 2};

  QUnit.test(
    '`_.' + methodName + '` should iterate over own string keyed properties of objects',
    function(assert) {
      assert.expect(1);

      function Foo() {
        this.a = 'a';
      }
      Foo.prototype.b = 'b';

      var actual = func(new Foo(), function(value, key) {
        return key;
      });
      assert.deepEqual(actual, {a: 'a'});
    }
  );

  QUnit.test('`_.' + methodName + '` should accept a falsey `object` argument', function(assert) {
    assert.expect(1);

    var expected = lodashStable.map(falsey, alwaysEmptyObject);

    var actual = lodashStable.map(falsey, function(object, index) {
      try {
        return index ? func(object) : func();
      } catch (e) {}
    });

    assert.deepEqual(actual, expected);
  });

  QUnit.test('`_.' + methodName + '` should return a wrapped value when chaining', function(
    assert
  ) {
    assert.expect(1);

    if (!isNpm) {
      assert.ok(_(object)[methodName](noop) instanceof _);
    } else {
      skipAssert(assert);
    }
  });
});

//-----------

QUnit.module('lodash.merge');

  (function() {
    var args = arguments;

    QUnit.test('should merge `source` into `object`', function(assert) {
      assert.expect(1);

      var names = {
        'characters': [
          { 'name': 'barney' },
          { 'name': 'fred' }
        ]
      };

      var ages = {
        'characters': [
          { 'age': 36 },
          { 'age': 40 }
        ]
      };

      var heights = {
        'characters': [
          { 'height': '5\'4"' },
          { 'height': '5\'5"' }
        ]
      };

      var expected = {
        'characters': [
          { 'name': 'barney', 'age': 36, 'height': '5\'4"' },
          { 'name': 'fred', 'age': 40, 'height': '5\'5"' }
        ]
      };

      assert.deepEqual(_.merge(names, ages, heights), expected);
    });

    QUnit.test('should merge sources containing circular references', function(assert) {
      assert.expect(2);

      var object = {
        'foo': { 'a': 1 },
        'bar': { 'a': 2 }
      };

      var source = {
        'foo': { 'b': { 'c': { 'd': {} } } },
        'bar': {}
      };

      source.foo.b.c.d = source;
      source.bar.b = source.foo.b;

      var actual = _.merge(object, source);

      assert.notStrictEqual(actual.bar.b, actual.foo.b);
      assert.strictEqual(actual.foo.b.c.d, actual.foo.b.c.d.foo.b.c.d);
    });

    QUnit.test('should work with four arguments', function(assert) {
      assert.expect(1);

      var expected = { 'a': 4 },
          actual = _.merge({ 'a': 1 }, { 'a': 2 }, { 'a': 3 }, expected);

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should merge onto function `object` values', function(assert) {
      assert.expect(2);

      function Foo() {}

      var source = { 'a': 1 },
          actual = _.merge(Foo, source);

      assert.strictEqual(actual, Foo);
      assert.strictEqual(Foo.a, 1);
    });

    QUnit.test('should not merge onto nested function values', function(assert) {
      assert.expect(3);

      var source1 = { 'a': function() {} },
          source2 = { 'a': { 'b': 1 } },
          actual = _.merge({}, source1, source2),
          expected = { 'a': { 'b': 1 } };

      assert.deepEqual(actual, expected);

      source1 = { 'a': function() {} };
      source2 = { 'a': { 'b': 1 } };

      expected = { 'a': function() {} };
      expected.a.b = 1;

      actual = _.merge(source1, source2);
      assert.strictEqual(typeof actual.a, 'function');
      assert.strictEqual(actual.a.b, 1);
    });

    QUnit.test('should merge onto non-plain `object` values', function(assert) {
      assert.expect(2);

      function Foo() {}

      var object = new Foo,
          actual = _.merge(object, { 'a': 1 });

      assert.strictEqual(actual, object);
      assert.strictEqual(object.a, 1);
    });

    QUnit.test('should treat sparse array sources as dense', function(assert) {
      assert.expect(2);

      var array = [1];
      array[2] = 3;

      var actual = _.merge([], array),
          expected = array.slice();

      expected[1] = undefined;

      assert.ok('1' in actual);
      assert.deepEqual(actual, expected);
    });

    QUnit.test('should merge `arguments` objects', function(assert) {
      assert.expect(7);

      var object1 = { 'value': args },
          object2 = { 'value': { '3': 4 } },
          expected = { '0': 1, '1': 2, '2': 3, '3': 4 },
          actual = _.merge(object1, object2);

      assert.notOk('3' in args);
      assert.notOk(_.isArguments(actual.value));
      assert.deepEqual(actual.value, expected);
      object1.value = args;

      actual = _.merge(object2, object1);
      assert.notOk(_.isArguments(actual.value));
      assert.deepEqual(actual.value, expected);

      expected = { '0': 1, '1': 2, '2': 3 };

      actual = _.merge({}, object1);
      assert.notOk(_.isArguments(actual.value));
      assert.deepEqual(actual.value, expected);
    });

    QUnit.test('should merge typed arrays', function(assert) {
      assert.expect(4);

      var array1 = [0],
          array2 = [0, 0],
          array3 = [0, 0, 0, 0],
          array4 = [0, 0, 0, 0, 0, 0, 0, 0];

      var arrays = [array2, array1, array4, array3, array2, array4, array4, array3, array2],
          buffer = ArrayBuffer && new ArrayBuffer(8);

      // Juggle for `Float64Array` shim.
      if (root.Float64Array && (new Float64Array(buffer)).length == 8) {
        arrays[1] = array4;
      }
      var expected = lodashStable.map(typedArrays, function(type, index) {
        var array = arrays[index].slice();
        array[0] = 1;
        return root[type] ? { 'value': array } : false;
      });

      var actual = lodashStable.map(typedArrays, function(type) {
        var Ctor = root[type];
        return Ctor ? _.merge({ 'value': new Ctor(buffer) }, { 'value': [1] }) : false;
      });

      assert.ok(lodashStable.isArray(actual));
      assert.deepEqual(actual, expected);

      expected = lodashStable.map(typedArrays, function(type, index) {
        var array = arrays[index].slice();
        array.push(1);
        return root[type] ? { 'value': array } : false;
      });

      actual = lodashStable.map(typedArrays, function(type, index) {
        var Ctor = root[type],
            array = lodashStable.range(arrays[index].length);

        array.push(1);
        return Ctor ? _.merge({ 'value': array }, { 'value': new Ctor(buffer) }) : false;
      });

      assert.ok(lodashStable.isArray(actual));
      assert.deepEqual(actual, expected);
    });

    QUnit.test('should assign `null` values', function(assert) {
      assert.expect(1);

      var actual = _.merge({ 'a': 1 }, { 'a': null });
      assert.strictEqual(actual.a, null);
    });

    QUnit.test('should assign non array/typed-array/plain-object sources directly', function(assert) {
      assert.expect(1);

      function Foo() {}

      var values = [new Foo, new Boolean, new Date, Foo, new Number, new String, new RegExp],
          expected = lodashStable.map(values, alwaysTrue);

      var actual = lodashStable.map(values, function(value) {
        var object = _.merge({}, { 'value': value });
        return object.value === value;
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should deep clone array/typed-array/plain-object sources', function(assert) {
      assert.expect(1);

      var typedArray = Uint8Array
        ? new Uint8Array(new ArrayBuffer(2))
        : { 'buffer': [0, 0] };

      var props = ['0', 'a', 'buffer'],
          values = [[{ 'a': 1 }], { 'a': [1] }, typedArray],
          expected = lodashStable.map(values, alwaysTrue);

      var actual = lodashStable.map(values, function(value, index) {
        var key = props[index],
            object = _.merge({}, { 'value': value }),
            newValue = object.value;

        return (
          newValue !== value &&
          newValue[key] !== value[key] &&
          lodashStable.isEqual(newValue, value)
        );
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should not augment source objects', function(assert) {
      assert.expect(6);

      var source1 = { 'a': [{ 'a': 1 }] },
          source2 = { 'a': [{ 'b': 2 }] },
          actual = _.merge({}, source1, source2);

      assert.deepEqual(source1.a, [{ 'a': 1 }]);
      assert.deepEqual(source2.a, [{ 'b': 2 }]);
      assert.deepEqual(actual.a, [{ 'a': 1, 'b': 2 }]);

      var source1 = { 'a': [[1, 2, 3]] },
          source2 = { 'a': [[3, 4]] },
          actual = _.merge({}, source1, source2);

      assert.deepEqual(source1.a, [[1, 2, 3]]);
      assert.deepEqual(source2.a, [[3, 4]]);
      assert.deepEqual(actual.a, [[3, 4, 3]]);
    });

    QUnit.test('should merge plain-objects onto non plain-objects', function(assert) {
      assert.expect(4);

      function Foo(object) {
        lodashStable.assign(this, object);
      }

      var object = { 'a': 1 },
          actual = _.merge(new Foo, object);

      assert.ok(actual instanceof Foo);
      assert.deepEqual(actual, new Foo(object));

      actual = _.merge([new Foo], [object]);
      assert.ok(actual[0] instanceof Foo);
      assert.deepEqual(actual, [new Foo(object)]);
    });

    QUnit.test('should not assign `undefined` values', function(assert) {
      assert.expect(1);

      var actual = _.merge({ 'a': 1 }, { 'a': undefined, 'b': undefined });
      assert.deepEqual(actual, { 'a': 1 });
    });

    QUnit.test('should skip `undefined` values in array sources if a destination value exists', function(assert) {
      assert.expect(2);

      var array = [1];
      array[2] = 3;

      var actual = _.merge([4, 5, 6], array),
          expected = [1, 5, 3];

      assert.deepEqual(actual, expected);

      array = [1, , 3];
      array[1] = undefined;

      actual = _.merge([4, 5, 6], array);
      assert.deepEqual(actual, expected);
    });

    QUnit.test('should skip merging when `object` and `source` are the same value', function(assert) {
      assert.expect(1);

      if (defineProperty) {
        var object = {},
            pass = true;

        defineProperty(object, 'a', {
          'enumerable': true,
          'configurable': true,
          'get': function() { pass = false; },
          'set': function() { pass = false; }
        });

        _.merge(object, object);
        assert.ok(pass);
      }
      else {
        skipAssert(assert);
      }
    });

    QUnit.test('should convert values to arrays when merging arrays of `source`', function(assert) {
      assert.expect(2);

      var object = { 'a': { '1': 'y', 'b': 'z', 'length': 2 } },
          actual = _.merge(object, { 'a': ['x'] });

      assert.deepEqual(actual, { 'a': ['x', 'y'] });

      actual = _.merge({ 'a': {} }, { 'a': [] });
      assert.deepEqual(actual, { 'a': [] });
    });

    QUnit.test('should not convert strings to arrays when merging arrays of `source`', function(assert) {
      assert.expect(1);

      var object = { 'a': 'abcde' },
          actual = _.merge(object, { 'a': ['x', 'y', 'z'] });

      assert.deepEqual(actual, { 'a': ['x', 'y', 'z'] });
    });

    QUnit.test('should not error on DOM elements', function(assert) {
      assert.expect(1);

      var object1 = { 'el': document && document.createElement('div') },
          object2 = { 'el': document && document.createElement('div') },
          pairs = [[{}, object1], [object1, object2]],
          expected = lodashStable.map(pairs, alwaysTrue);

      var actual = lodashStable.map(pairs, function(pair) {
        try {
          return _.merge(pair[0], pair[1]).el === pair[1].el;
        } catch (e) {}
      });

      assert.deepEqual(actual, expected);
    });
  }(1, 2, 3));

  //------------

  QUnit.module('lodash.omit');
  
    (function() {
      var args = arguments,
          object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
  
      QUnit.test('should flatten `props`', function(assert) {
        assert.expect(2);
  
        assert.deepEqual(_.omit(object, 'a', 'c'), { 'b': 2, 'd': 4 });
        assert.deepEqual(_.omit(object, ['a', 'd'], 'c'), { 'b': 2 });
      });
  
      QUnit.test('should work with a primitive `object` argument', function(assert) {
        assert.expect(1);
  
        stringProto.a = 1;
        stringProto.b = 2;
  
        assert.deepEqual(_.omit('', 'b'), { 'a': 1 });
  
        delete stringProto.a;
        delete stringProto.b;
      });
  
      QUnit.test('should return an empty object when `object` is nullish', function(assert) {
        assert.expect(2);
  
        objectProto.a = 1;
        lodashStable.each([null, undefined], function(value) {
          assert.deepEqual(_.omit(value, 'valueOf'), {});
        });
        delete objectProto.a;
      });
  
      QUnit.test('should work with `arguments` objects as secondary arguments', function(assert) {
        assert.expect(1);
  
        assert.deepEqual(_.omit(object, args), { 'b': 2, 'd': 4 });
      });
  
      QUnit.test('should coerce property names to strings', function(assert) {
        assert.expect(1);
  
        assert.deepEqual(_.omit({ '0': 'a' }, 0), {});
      });
    }('a', 'c'));

//-----------------------

QUnit.module('lodash.once');

  (function() {
    QUnit.test('should invoke `func` once', function(assert) {
      assert.expect(2);

      var count = 0,
          once = _.once(function() { return ++count; });

      once();
      assert.strictEqual(once(), 1);
      assert.strictEqual(count, 1);
    });

    QUnit.test('should ignore recursive calls', function(assert) {
      assert.expect(2);

      var count = 0;

      var once = _.once(function() {
        once();
        return ++count;
      });

      assert.strictEqual(once(), 1);
      assert.strictEqual(count, 1);
    });

    QUnit.test('should not throw more than once', function(assert) {
      assert.expect(2);

      var pass = true;

      var once = _.once(function() {
        throw new Error;
      });

      assert.raises(once);

      try {
        once();
      } catch (e) {
        pass = false;
      }
      assert.ok(pass);
    });
  }());

//-----------------

QUnit.module('lodash.padEnd');

  (function() {
    var string = 'abc';

    QUnit.test('should pad a string to a given length', function(assert) {
      assert.expect(1);

      var values = [, undefined],
          expected = lodashStable.map(values, lodashStable.constant('abc   '));

      var actual = lodashStable.map(values, function(value, index) {
        return index ? _.padEnd(string, 6, value) : _.padEnd(string, 6);
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should truncate pad characters to fit the pad length', function(assert) {
      assert.expect(1);

      assert.strictEqual(_.padEnd(string, 6, '_-'), 'abc_-_');
    });

    QUnit.test('should coerce `string` to a string', function(assert) {
      assert.expect(1);

      var values = [Object(string), { 'toString': lodashStable.constant(string) }],
          expected = lodashStable.map(values, alwaysTrue);

      var actual = lodashStable.map(values, function(value) {
        return _.padEnd(value, 6) === 'abc   ';
      });

      assert.deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.padStart');

  (function() {
    var string = 'abc';

    QUnit.test('should pad a string to a given length', function(assert) {
      assert.expect(1);

      var values = [, undefined],
          expected = lodashStable.map(values, lodashStable.constant('   abc'));

      var actual = lodashStable.map(values, function(value, index) {
        return index ? _.padStart(string, 6, value) : _.padStart(string, 6);
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should truncate pad characters to fit the pad length', function(assert) {
      assert.expect(1);

      assert.strictEqual(_.padStart(string, 6, '_-'), '_-_abc');
    });

    QUnit.test('should coerce `string` to a string', function(assert) {
      assert.expect(1);

      var values = [Object(string), { 'toString': lodashStable.constant(string) }],
          expected = lodashStable.map(values, alwaysTrue);

      var actual = lodashStable.map(values, function(value) {
        return _.padStart(value, 6) === '   abc';
      });

      assert.deepEqual(actual, expected);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('pad methods');

  lodashStable.each(['pad', 'padStart', 'padEnd'], function(methodName) {
    var func = _[methodName],
        isPad = methodName == 'pad',
        isStart = methodName == 'padStart',
        string = 'abc';

    QUnit.test('`_.' + methodName + '` should not pad if string is >= `length`', function(assert) {
      assert.expect(2);

      assert.strictEqual(func(string, 2), string);
      assert.strictEqual(func(string, 3), string);
    });

    QUnit.test('`_.' + methodName + '` should treat negative `length` as `0`', function(assert) {
      assert.expect(2);

      lodashStable.each([0, -2], function(length) {
        assert.strictEqual(func(string, length), string);
      });
    });

    QUnit.test('`_.' + methodName + '` should coerce `length` to a number', function(assert) {
      assert.expect(2);

      lodashStable.each(['', '4'], function(length) {
        var actual = length ? (isStart ? ' abc' : 'abc ') : string;
        assert.strictEqual(func(string, length), actual);
      });
    });

    QUnit.test('`_.' + methodName + '` should treat nullish values as empty strings', function(assert) {
      assert.expect(6);

      lodashStable.each([undefined, '_-'], function(chars) {
        var expected = chars ? (isPad ? '__' : chars) : '  ';
        assert.strictEqual(func(null, 2, chars), expected);
        assert.strictEqual(func(undefined, 2, chars), expected);
        assert.strictEqual(func('', 2, chars), expected);
      });
    });

    QUnit.test('`_.' + methodName + '` should return `string` when `chars` coerces to an empty string', function(assert) {
      assert.expect(1);

      var values = ['', Object('')],
          expected = lodashStable.map(values, lodashStable.constant(string));

      var actual = lodashStable.map(values, function(value) {
        return _.pad(string, 6, value);
      });

      assert.deepEqual(actual, expected);
    });
  });

//---------------  

QUnit.module('partial methods');

  lodashStable.each(['partial', 'partialRight'], function(methodName) {
    var func = _[methodName],
        isPartial = methodName == 'partial',
        ph = func.placeholder;

    QUnit.test('`_.' + methodName + '` partially applies arguments', function(assert) {
      assert.expect(1);

      var par = func(identity, 'a');
      assert.strictEqual(par(), 'a');
    });

    QUnit.test('`_.' + methodName + '` creates a function that can be invoked with additional arguments', function(assert) {
      assert.expect(1);

      var fn = function(a, b) { return [a, b]; },
          par = func(fn, 'a'),
          expected = isPartial ? ['a', 'b'] : ['b', 'a'];

      assert.deepEqual(par('b'), expected);
    });

    QUnit.test('`_.' + methodName + '` works when there are no partially applied arguments and the created function is invoked without additional arguments', function(assert) {
      assert.expect(1);

      var fn = function() { return arguments.length; },
          par = func(fn);

      assert.strictEqual(par(), 0);
    });

    QUnit.test('`_.' + methodName + '` works when there are no partially applied arguments and the created function is invoked with additional arguments', function(assert) {
      assert.expect(1);

      var par = func(identity);
      assert.strictEqual(par('a'), 'a');
    });

    QUnit.test('`_.' + methodName + '` should support placeholders', function(assert) {
      assert.expect(4);

      var fn = function() { return slice.call(arguments); },
          par = func(fn, ph, 'b', ph);

      assert.deepEqual(par('a', 'c'), ['a', 'b', 'c']);
      assert.deepEqual(par('a'), ['a', 'b', undefined]);
      assert.deepEqual(par(), [undefined, 'b', undefined]);

      if (isPartial) {
        assert.deepEqual(par('a', 'c', 'd'), ['a', 'b', 'c', 'd']);
      } else {
        par = func(fn, ph, 'c', ph);
        assert.deepEqual(par('a', 'b', 'd'), ['a', 'b', 'c', 'd']);
      }
    });

    QUnit.test('`_.' + methodName + '` should use `_.placeholder` when set', function(assert) {
      assert.expect(1);

      if (!isModularize) {
        var _ph = _.placeholder = {},
            fn = function() { return slice.call(arguments); },
            par = func(fn, _ph, 'b', ph),
            expected = isPartial ? ['a', 'b', ph, 'c'] : ['a', 'c', 'b', ph];

        assert.deepEqual(par('a', 'c'), expected);
        delete _.placeholder;
      }
      else {
        skipAssert(assert);
      }
    });

    QUnit.test('`_.' + methodName + '` creates a function with a `length` of `0`', function(assert) {
      assert.expect(1);

      var fn = function(a, b, c) {},
          par = func(fn, 'a');

      assert.strictEqual(par.length, 0);
    });

    QUnit.test('`_.' + methodName + '` should ensure `new par` is an instance of `func`', function(assert) {
      assert.expect(2);

      function Foo(value) {
        return value && object;
      }

      var object = {},
          par = func(Foo);

      assert.ok(new par instanceof Foo);
      assert.strictEqual(new par(true), object);
    });

    QUnit.test('`_.' + methodName + '` should clone metadata for created functions', function(assert) {
      assert.expect(3);

      function greet(greeting, name) {
        return greeting + ' ' + name;
      }

      var par1 = func(greet, 'hi'),
          par2 = func(par1, 'barney'),
          par3 = func(par1, 'pebbles');

      assert.strictEqual(par1('fred'), isPartial ? 'hi fred' : 'fred hi');
      assert.strictEqual(par2(), isPartial ? 'hi barney'  : 'barney hi');
      assert.strictEqual(par3(), isPartial ? 'hi pebbles' : 'pebbles hi');
    });

    QUnit.test('`_.' + methodName + '` should work with curried functions', function(assert) {
      assert.expect(2);

      var fn = function(a, b, c) { return a + b + c; },
          curried = _.curry(func(fn, 1), 2);

      assert.strictEqual(curried(2, 3), 6);
      assert.strictEqual(curried(2)(3), 6);
    });

    QUnit.test('should work with placeholders and curried functions', function(assert) {
      assert.expect(1);

      var fn = function() { return slice.call(arguments); },
          curried = _.curry(fn),
          par = func(curried, ph, 'b', ph, 'd');

      assert.deepEqual(par('a', 'c'), ['a', 'b', 'c', 'd']);
    });
  });

//----------------------

QUnit.module('lodash.partition');

  (function() {
    var array = [1, 0, 1];

    QUnit.test('should split elements into two groups by `predicate`', function(assert) {
      assert.expect(3);

      assert.deepEqual(_.partition([], identity), [[], []]);
      assert.deepEqual(_.partition(array, alwaysTrue), [array, []]);
      assert.deepEqual(_.partition(array, alwaysFalse), [[], array]);
    });

    QUnit.test('should use `_.identity` when `predicate` is nullish', function(assert) {
      assert.expect(1);

      var values = [, null, undefined],
          expected = lodashStable.map(values, lodashStable.constant([[1, 1], [0]]));

      var actual = lodashStable.map(values, function(value, index) {
        return index ? _.partition(array, value) : _.partition(array);
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should work with `_.property` shorthands', function(assert) {
      assert.expect(1);

      var objects = [{ 'a': 1 }, { 'a': 1 }, { 'b': 2 }],
          actual = _.partition(objects, 'a');

      assert.deepEqual(actual, [objects.slice(0, 2), objects.slice(2)]);
    });

    QUnit.test('should work with a number for `predicate`', function(assert) {
      assert.expect(2);

      var array = [
        [1, 0],
        [0, 1],
        [1, 0]
      ];

      assert.deepEqual(_.partition(array, 0), [[array[0], array[2]], [array[1]]]);
      assert.deepEqual(_.partition(array, 1), [[array[1]], [array[0], array[2]]]);
    });

    QUnit.test('should work with an object for `collection`', function(assert) {
      assert.expect(1);

      var actual = _.partition({ 'a': 1.1, 'b': 0.2, 'c': 1.3 }, Math.floor);
      assert.deepEqual(actual, [[1.1, 1.3], [0.2]]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.pick');

  (function() {
    var args = arguments,
        object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };

    QUnit.test('should flatten `props`', function(assert) {
      assert.expect(2);

      assert.deepEqual(_.pick(object, 'a', 'c'), { 'a': 1, 'c': 3 });
      assert.deepEqual(_.pick(object, ['a', 'd'], 'c'), { 'a': 1, 'c': 3, 'd': 4 });
    });

    QUnit.test('should work with a primitive `object` argument', function(assert) {
      assert.expect(1);

      assert.deepEqual(_.pick('', 'slice'), { 'slice': ''.slice });
    });

    QUnit.test('should return an empty object when `object` is nullish', function(assert) {
      assert.expect(2);

      lodashStable.each([null, undefined], function(value) {
        assert.deepEqual(_.pick(value, 'valueOf'), {});
      });
    });

    QUnit.test('should work with `arguments` objects as secondary arguments', function(assert) {
      assert.expect(1);

      assert.deepEqual(_.pick(object, args), { 'a': 1, 'c': 3 });
    });

    QUnit.test('should coerce property names to strings', function(assert) {
      assert.expect(1);

      assert.deepEqual(_.pick({ '0': 'a', '1': 'b' }, 0), { '0': 'a' });
    });
  }('a', 'c'));

//---------------

QUnit.module('pick methods');

  lodashStable.each(['pick', 'pickBy'], function(methodName) {
    var expected = { 'a': 1, 'c': 3 },
        func = _[methodName],
        object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 },
        prop = lodashStable.nthArg(1);

    if (methodName == 'pickBy') {
      prop = function(object, props) {
        props = lodashStable.isArray(props) ? props : [props];
        return function(value) {
          return lodashStable.some(props, function(key) {
            return object[key] === value;
          });
        };
      };
    }
    QUnit.test('`_.' + methodName + '` should create an object of picked string keyed properties', function(assert) {
      assert.expect(2);

      assert.deepEqual(func(object, prop(object, 'a')), { 'a': 1 });
      assert.deepEqual(func(object, prop(object, ['a', 'c'])), expected);
    });

    QUnit.test('`_.' + methodName + '` should pick inherited string keyed properties', function(assert) {
      assert.expect(1);

      function Foo() {}
      Foo.prototype = object;

      var foo = new Foo;
      assert.deepEqual(func(foo, prop(foo, ['a', 'c'])), expected);
    });

    QUnit.test('`_.' + methodName + '` should pick symbol properties', function(assert) {
      assert.expect(2);

      function Foo() {
        this[symbol] = 1;
      }

      if (Symbol) {
        var symbol2 = Symbol('b');
        Foo.prototype[symbol2] = 2;

        var foo = new Foo,
            actual = func(foo, prop(foo, [symbol, symbol2]));

        assert.strictEqual(actual[symbol], 1);
        assert.strictEqual(actual[symbol2], 2);
      }
      else {
        skipAssert(assert, 2);
      }
    });

    QUnit.test('`_.' + methodName + '` should work with an array `object` argument', function(assert) {
      assert.expect(1);

      var array = [1, 2, 3];
      assert.deepEqual(func(array, prop(array, '1')), { '1': 2 });
    });
  });

//---------------

QUnit.module('range methods');

  lodashStable.each(['range', 'rangeRight'], function(methodName) {
    var func = _[methodName],
        isRange = methodName == 'range';

    function resolve(range) {
      return isRange ? range : range.reverse();
    }

    QUnit.test('`_.' + methodName + '` should infer the sign of `step` when only `end` is given', function(assert) {
      assert.expect(2);

      assert.deepEqual(func(4), resolve([0, 1, 2, 3]));
      assert.deepEqual(func(-4), resolve([0, -1, -2, -3]));
    });

    QUnit.test('`_.' + methodName + '` should infer the sign of `step` when only `start` and `end` are given', function(assert) {
      assert.expect(2);

      assert.deepEqual(func(1, 5), resolve([1, 2, 3, 4]));
      assert.deepEqual(func(5, 1), resolve([5, 4, 3, 2]));
    });

    QUnit.test('`_.' + methodName + '` should work with `start`, `end`, and `step` arguments', function(assert) {
      assert.expect(3);

      assert.deepEqual(func(0, -4, -1), resolve([0, -1, -2, -3]));
      assert.deepEqual(func(5, 1, -1), resolve([5, 4, 3, 2]));
      assert.deepEqual(func(0, 20, 5), resolve([0, 5, 10, 15]));
    });

    QUnit.test('`_.' + methodName + '` should support a `step` of `0`', function(assert) {
      assert.expect(1);

      assert.deepEqual(func(1, 4, 0), [1, 1, 1]);
    });

    QUnit.test('`_.' + methodName + '` should work with a `step` larger than `end`', function(assert) {
      assert.expect(1);

      assert.deepEqual(func(1, 5, 20), [1]);
    });

    QUnit.test('`_.' + methodName + '` should work with a negative `step` argument', function(assert) {
      assert.expect(2);

      assert.deepEqual(func(0, -4, -1), resolve([0, -1, -2, -3]));
      assert.deepEqual(func(21, 10, -3), resolve([21, 18, 15, 12]));
    });

    QUnit.test('`_.' + methodName + '` should support `start` of `-0`', function(assert) {
      assert.expect(1);

      var actual = func(-0, 1);
      assert.strictEqual(1 / actual[0], -Infinity);
    });

    QUnit.test('`_.' + methodName + '` should treat falsey `start` arguments as `0`', function(assert) {
      assert.expect(13);

      lodashStable.each(falsey, function(value, index) {
        if (index) {
          assert.deepEqual(func(value), []);
          assert.deepEqual(func(value, 1), [0]);
        } else {
          assert.deepEqual(func(), []);
        }
      });
    });

    QUnit.test('`_.' + methodName + '` should coerce arguments to finite numbers', function(assert) {
      assert.expect(1);

      var actual = [func('0', 1), func('1'), func(0, 1, '1'), func(NaN), func(NaN, NaN)];
      assert.deepEqual(actual, [[0], [0], [0], [], []]);
    });

    QUnit.test('`_.' + methodName + '` should work as an iteratee for methods like `_.map`', function(assert) {
      assert.expect(2);

      var array = [1, 2, 3],
          object = { 'a': 1, 'b': 2, 'c': 3 },
          expected = lodashStable.map([[0], [0, 1], [0, 1, 2]], resolve);

      lodashStable.each([array, object], function(collection) {
        var actual = lodashStable.map(collection, func);
        assert.deepEqual(actual, expected);
      });
    });
  });

//-------------

QUnit.module('lodash.get and lodash.result');

  lodashStable.each(['get', 'result'], function(methodName) {
    var func = _[methodName];

    QUnit.test('`_.' + methodName + '` should get string keyed property values', function(assert) {
      assert.expect(2);

      var object = { 'a': 1 };

      lodashStable.each(['a', ['a']], function(path) {
        assert.strictEqual(func(object, path), 1);
      });
    });

    QUnit.test('`_.' + methodName + '` should get symbol keyed property values', function(assert) {
      assert.expect(1);

      if (Symbol) {
        var object = {};
        object[symbol] = 1;

        assert.strictEqual(func(object, symbol), 1);
      }
      else {
        skipAssert(assert);
      }
    });

    QUnit.test('`_.' + methodName + '` should get deep property values', function(assert) {
      assert.expect(2);

      var object = { 'a': { 'b': 2 } };

      lodashStable.each(['a.b', ['a', 'b']], function(path) {
        assert.strictEqual(func(object, path), 2);
      });
    });

    QUnit.test('`_.' + methodName + '` should get a key over a path', function(assert) {
      assert.expect(2);

      var object = { 'a.b': 1, 'a': { 'b': 2 } };

      lodashStable.each(['a.b', ['a.b']], function(path) {
        assert.strictEqual(func(object, path), 1);
      });
    });

    QUnit.test('`_.' + methodName + '` should not coerce array paths to strings', function(assert) {
      assert.expect(1);

      var object = { 'a,b,c': 3, 'a': { 'b': { 'c': 4 } } };
      assert.strictEqual(func(object, ['a', 'b', 'c']), 4);
    });

    QUnit.test('`_.' + methodName + '` should ignore empty brackets', function(assert) {
      assert.expect(1);

      var object = { 'a': 1 };
      assert.strictEqual(func(object, 'a[]'), 1);
    });

    QUnit.test('`_.' + methodName + '` should handle empty paths', function(assert) {
      assert.expect(4);

      lodashStable.each([['', ''], [[], ['']]], function(pair) {
        assert.strictEqual(func({}, pair[0]), undefined);
        assert.strictEqual(func({ '': 3 }, pair[1]), 3);
      });
    });

    QUnit.test('`_.' + methodName + '` should handle complex paths', function(assert) {
      assert.expect(2);

      var object = { 'a': { '-1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': 8 } } } } } } } };

      var paths = [
        'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
        ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
      ];

      lodashStable.each(paths, function(path) {
        assert.strictEqual(func(object, path), 8);
      });
    });

    QUnit.test('`_.' + methodName + '` should return `undefined` when `object` is nullish', function(assert) {
      assert.expect(4);

      lodashStable.each(['constructor', ['constructor']], function(path) {
        assert.strictEqual(func(null, path), undefined);
        assert.strictEqual(func(undefined, path), undefined);
      });
    });

    QUnit.test('`_.' + methodName + '` should return `undefined` with deep paths when `object` is nullish', function(assert) {
      assert.expect(2);

      var values = [null, undefined],
          expected = lodashStable.map(values, alwaysUndefined),
          paths = ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']];

      lodashStable.each(paths, function(path) {
        var actual = lodashStable.map(values, function(value) {
          return func(value, path);
        });

        assert.deepEqual(actual, expected);
      });
    });

    QUnit.test('`_.' + methodName + '` should return `undefined` if parts of `path` are missing', function(assert) {
      assert.expect(2);

      var object = { 'a': [, null] };

      lodashStable.each(['a[1].b.c', ['a', '1', 'b', 'c']], function(path) {
        assert.strictEqual(func(object, path), undefined);
      });
    });

    QUnit.test('`_.' + methodName + '` should be able to return `null` values', function(assert) {
      assert.expect(2);

      var object = { 'a': { 'b': null } };

      lodashStable.each(['a.b', ['a', 'b']], function(path) {
        assert.strictEqual(func(object, path), null);
      });
    });

    QUnit.test('`_.' + methodName + '` should follow `path` over non-plain objects', function(assert) {
      assert.expect(2);

      var paths = ['a.b', ['a', 'b']];

      lodashStable.each(paths, function(path) {
        numberProto.a = { 'b': 2 };
        assert.strictEqual(func(0, path), 2);
        delete numberProto.a;
      });
    });

    QUnit.test('`_.' + methodName + '` should return the default value for `undefined` values', function(assert) {
      assert.expect(1);

      var object = { 'a': {} },
          values = empties.concat(true, new Date, 1, /x/, 'a');

      var expected = lodashStable.transform(values, function(result, value) {
        result.push(value, value, value, value);
      });

      var actual = lodashStable.transform(values, function(result, value) {
        lodashStable.each(['a.b', ['a', 'b']], function(path) {
          result.push(
            func(object, path, value),
            func(null, path, value)
          );
        });
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('`_.' + methodName + '` should return the default value when `path` is empty', function(assert) {
      assert.expect(1);

      assert.strictEqual(func({}, [], 'a'), 'a');
    });
  });

//--------------

QUnit.module('set methods');

  lodashStable.each(['update', 'updateWith', 'set', 'setWith'], function(methodName) {
    var func = _[methodName],
        isUpdate = methodName == 'update' || methodName == 'updateWith';

    var oldValue = 1,
        value = 2,
        updater = isUpdate ? lodashStable.constant(value) : value;

    QUnit.test('`_.' + methodName + '` should set property values', function(assert) {
      assert.expect(4);

      var object = { 'a': oldValue };

      lodashStable.each(['a', ['a']], function(path) {
        var actual = func(object, path, updater);

        assert.strictEqual(actual, object);
        assert.strictEqual(object.a, value);

        object.a = oldValue;
      });
    });

    QUnit.test('`_.' + methodName + '` should set deep property values', function(assert) {
      assert.expect(4);

      var object = { 'a': { 'b': oldValue } };

      lodashStable.each(['a.b', ['a', 'b']], function(path) {
        var actual = func(object, path, updater);

        assert.strictEqual(actual, object);
        assert.strictEqual(object.a.b, value);

        object.a.b = oldValue;
      });
    });

    QUnit.test('`_.' + methodName + '` should set a key over a path', function(assert) {
      assert.expect(4);

      var object = { 'a.b': oldValue };

      lodashStable.each(['a.b', ['a.b']], function(path) {
        var actual = func(object, path, updater);

        assert.strictEqual(actual, object);
        assert.deepEqual(object, { 'a.b': value });

        object['a.b'] = oldValue;
      });
    });

    QUnit.test('`_.' + methodName + '` should not coerce array paths to strings', function(assert) {
      assert.expect(1);

      var object = { 'a,b,c': 1, 'a': { 'b': { 'c': 1 } } };

      func(object, ['a', 'b', 'c'], updater);
      assert.strictEqual(object.a.b.c, value);
    });

    QUnit.test('`_.' + methodName + '` should ignore empty brackets', function(assert) {
      assert.expect(1);

      var object = {};

      func(object, 'a[]', updater);
      assert.deepEqual(object, { 'a': value });
    });

    QUnit.test('`_.' + methodName + '` should handle empty paths', function(assert) {
      assert.expect(4);

      lodashStable.each([['', ''], [[], ['']]], function(pair, index) {
        var object = {};

        func(object, pair[0], updater);
        assert.deepEqual(object, index ? {} : { '': value });

        func(object, pair[1], updater);
        assert.deepEqual(object, { '': value });
      });
    });

    QUnit.test('`_.' + methodName + '` should handle complex paths', function(assert) {
      assert.expect(2);

      var object = { 'a': { '1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': oldValue } } } } } } } };

      var paths = [
        'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
        ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
      ];

      lodashStable.each(paths, function(path) {
        func(object, path, updater);
        assert.strictEqual(object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g, value);
        object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g = oldValue;
      });
    });

    QUnit.test('`_.' + methodName + '` should create parts of `path` that are missing', function(assert) {
      assert.expect(6);

      var object = {};

      lodashStable.each(['a[1].b.c', ['a', '1', 'b', 'c']], function(path) {
        var actual = func(object, path, updater);

        assert.strictEqual(actual, object);
        assert.deepEqual(actual, { 'a': [undefined, { 'b': { 'c': value } }] });
        assert.notOk('0' in object.a);

        delete object.a;
      });
    });

    QUnit.test('`_.' + methodName + '` should not error when `object` is nullish', function(assert) {
      assert.expect(1);

      var values = [null, undefined],
          expected = [[null, null], [undefined, undefined]];

      var actual = lodashStable.map(values, function(value) {
        try {
          return [func(value, 'a.b', updater), func(value, ['a', 'b'], updater)];
        } catch (e) {
          return e.message;
        }
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('`_.' + methodName + '` should follow `path` over non-plain objects', function(assert) {
      assert.expect(4);

      var object = { 'a': '' },
          paths = ['constructor.prototype.a', ['constructor', 'prototype', 'a']];

      lodashStable.each(paths, function(path) {
        func(0, path, updater);
        assert.strictEqual(0..a, value);
        delete numberProto.a;
      });

      lodashStable.each(['a.replace.b', ['a', 'replace', 'b']], function(path) {
        func(object, path, updater);
        assert.strictEqual(stringProto.replace.b, value);
        delete stringProto.replace.b;
      });
    });

    QUnit.test('`_.' + methodName + '` should not error on paths over primitives in strict mode', function(assert) {
      'use strict';

      assert.expect(2);

      numberProto.a = oldValue;

      lodashStable.each(['a', 'a.a.a'], function(path) {
        try {
          func(0, path, updater);
          assert.strictEqual(0..a, oldValue);
        } catch (e) {
          assert.ok(false, e.message);
        }
        numberProto.a = oldValue;
      });

      delete numberProto.a;
    });

    QUnit.test('`_.' + methodName + '` should not create an array for missing non-index property names that start with numbers', function(assert) {
      assert.expect(1);

      var object = {};

      func(object, ['1a', '2b', '3c'], updater);
      assert.deepEqual(object, { '1a': { '2b': { '3c': value } } });
    });

    QUnit.test('`_.' + methodName + '` should not assign values that are the same as their destinations', function(assert) {
      assert.expect(4);

      lodashStable.each(['a', ['a'], { 'a': 1 }, NaN], function(value) {
        if (defineProperty) {
          var object = {},
              pass = true,
              updater = isUpdate ? lodashStable.constant(value) : value;

          defineProperty(object, 'a', {
            'enumerable': true,
            'configurable': true,
            'get': lodashStable.constant(value),
            'set': function() { pass = false; }
          });

          func(object, 'a', updater);
          assert.ok(pass);
        }
        else {
          skipAssert(assert);
        }
      });
    });
  });

//-----------------

QUnit.module('lodash.shuffle');

  (function() {
    var array = [1, 2, 3],
        object = { 'a': 1, 'b': 2, 'c': 3 };

    QUnit.test('should return a new array', function(assert) {
      assert.expect(1);

      assert.notStrictEqual(_.shuffle(array), array);
    });

    QUnit.test('should contain the same elements after a collection is shuffled', function(assert) {
      assert.expect(2);

      assert.deepEqual(_.shuffle(array).sort(), array);
      assert.deepEqual(_.shuffle(object).sort(), array);
    });

    QUnit.test('should shuffle small collections', function(assert) {
      assert.expect(1);

      var actual = lodashStable.times(1000, function(assert) {
        return _.shuffle([1, 2]);
      });

      assert.deepEqual(lodashStable.sortBy(lodashStable.uniqBy(actual, String), '0'), [[1, 2], [2, 1]]);
    });

    QUnit.test('should treat number values for `collection` as empty', function(assert) {
      assert.expect(1);

      assert.deepEqual(_.shuffle(1), []);
    });
  }());

//----------------

QUnit.module('lodash.sortedUniq');

  (function() {
    QUnit.test('should return unique values of a sorted array', function(assert) {
      assert.expect(3);

      var expected = [1, 2, 3];

      lodashStable.each([[1, 2, 3], [1, 1, 2, 2, 3], [1, 2, 3, 3, 3, 3, 3]], function(array) {
        assert.deepEqual(_.sortedUniq(array), expected);
      });
    });
  }());

//---------------

QUnit.module('lodash.tail');

  (function() {
    var array = [1, 2, 3];

    QUnit.test('should accept a falsey `array` argument', function(assert) {
      assert.expect(1);

      var expected = lodashStable.map(falsey, alwaysEmptyArray);

      var actual = lodashStable.map(falsey, function(array, index) {
        try {
          return index ? _.tail(array) : _.tail();
        } catch (e) {}
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('should exclude the first element', function(assert) {
      assert.expect(1);

      assert.deepEqual(_.tail(array), [2, 3]);
    });

    QUnit.test('should return an empty when querying empty arrays', function(assert) {
      assert.expect(1);

      assert.deepEqual(_.tail([]), []);
    });

    QUnit.test('should work as an iteratee for methods like `_.map`', function(assert) {
      assert.expect(1);

      var array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          actual = lodashStable.map(array, _.tail);

      assert.deepEqual(actual, [[2, 3], [5, 6], [8, 9]]);
    });

    QUnit.test('should work in a lazy sequence', function(assert) {
      assert.expect(4);

      if (!isNpm) {
        var array = lodashStable.range(LARGE_ARRAY_SIZE),
            values = [];

        var actual = _(array).tail().filter(function(value) {
          values.push(value);
          return false;
        })
        .value();

        assert.deepEqual(actual, []);
        assert.deepEqual(values, array.slice(1));

        values = [];

        actual = _(array).filter(function(value) {
          values.push(value);
          return isEven(value);
        })
        .tail()
        .value();

        assert.deepEqual(actual, _.tail(_.filter(array, isEven)));
        assert.deepEqual(values, array);
      }
      else {
        skipAssert(assert, 4);
      }
    });

    QUnit.test('should not execute subsequent iteratees on an empty array in a lazy sequence', function(assert) {
      assert.expect(4);

      if (!isNpm) {
        var array = lodashStable.range(LARGE_ARRAY_SIZE),
            iteratee = function() { pass = false; },
            pass = true,
            actual = _(array).slice(0, 1).tail().map(iteratee).value();

        assert.ok(pass);
        assert.deepEqual(actual, []);

        pass = true;
        actual = _(array).filter().slice(0, 1).tail().map(iteratee).value();

        assert.ok(pass);
        assert.deepEqual(actual, []);
      }
      else {
        skipAssert(assert, 4);
      }
    });
  }());

//-------------

QUnit.module('lodash.truncate');

  (function() {
    var string = 'hi-diddly-ho there, neighborino';

    QUnit.test('should use a default `length` of `30`', function(assert) {
      assert.expect(1);

      assert.strictEqual(_.truncate(string), 'hi-diddly-ho there, neighbo...');
    });

    QUnit.test('should not truncate if `string` is <= `length`', function(assert) {
      assert.expect(2);

      assert.strictEqual(_.truncate(string, { 'length': string.length }), string);
      assert.strictEqual(_.truncate(string, { 'length': string.length + 2 }), string);
    });

    QUnit.test('should truncate string the given length', function(assert) {
      assert.expect(1);

      assert.strictEqual(_.truncate(string, { 'length': 24 }), 'hi-diddly-ho there, n...');
    });

    QUnit.test('should support a `omission` option', function(assert) {
      assert.expect(1);

      assert.strictEqual(_.truncate(string, { 'omission': ' [...]' }), 'hi-diddly-ho there, neig [...]');
    });

    QUnit.test('should support a `length` option', function(assert) {
      assert.expect(1);

      assert.strictEqual(_.truncate(string, { 'length': 4 }), 'h...');
    });

    QUnit.test('should support a `separator` option', function(assert) {
      assert.expect(3);

      assert.strictEqual(_.truncate(string, { 'length': 24, 'separator': ' ' }), 'hi-diddly-ho there,...');
      assert.strictEqual(_.truncate(string, { 'length': 24, 'separator': /,? +/ }), 'hi-diddly-ho there...');
      assert.strictEqual(_.truncate(string, { 'length': 24, 'separator': /,? +/g }), 'hi-diddly-ho there...');
    });

    QUnit.test('should treat negative `length` as `0`', function(assert) {
      assert.expect(2);

      lodashStable.each([0, -2], function(length) {
        assert.strictEqual(_.truncate(string, { 'length': length }), '...');
      });
    });

    QUnit.test('should coerce `length` to an integer', function(assert) {
      assert.expect(4);

      lodashStable.each(['', NaN, 4.6, '4'], function(length, index) {
        var actual = index > 1 ? 'h...' : '...';
        assert.strictEqual(_.truncate(string, { 'length': { 'valueOf': lodashStable.constant(length) } }), actual);
      });
    });

    QUnit.test('should coerce `string` to a string', function(assert) {
      assert.expect(2);

      assert.strictEqual(_.truncate(Object(string), { 'length': 4 }), 'h...');
      assert.strictEqual(_.truncate({ 'toString': lodashStable.constant(string) }, { 'length': 5 }), 'hi...');
    });

    QUnit.test('should work as an iteratee for methods like `_.map`', function(assert) {
      assert.expect(1);

      var actual = lodashStable.map([string, string, string], _.truncate),
          truncated = 'hi-diddly-ho there, neighbo...';

      assert.deepEqual(actual, [truncated, truncated, truncated]);
    });
  }());

//---------------

QUnit.module('lodash.throttle');

  (function() {
    QUnit.test('should throttle a function', function(assert) {
      assert.expect(2);

      var done = assert.async();

      var callCount = 0,
          throttled = _.throttle(function() { callCount++; }, 32);

      throttled();
      throttled();
      throttled();

      var lastCount = callCount;
      assert.ok(callCount > 0);

      setTimeout(function() {
        assert.ok(callCount > lastCount);
        done();
      }, 64);
    });

    QUnit.test('subsequent calls should return the result of the first call', function(assert) {
      assert.expect(5);

      var done = assert.async();

      var throttled = _.throttle(identity, 32),
          result = [throttled('a'), throttled('b')];

      assert.deepEqual(result, ['a', 'a']);

      setTimeout(function() {
        var result = [throttled('x'), throttled('y')];
        assert.notEqual(result[0], 'a');
        assert.notStrictEqual(result[0], undefined);

        assert.notEqual(result[1], 'y');
        assert.notStrictEqual(result[1], undefined);
        done();
      }, 64);
    });

    QUnit.test('should clear timeout when `func` is called', function(assert) {
      assert.expect(1);

      var done = assert.async();

      if (!isModularize) {
        var callCount = 0,
            dateCount = 0;

        var getTime = function() {
          return ++dateCount == 5
            ? Infinity
            : +new Date;
        };

        var lodash = _.runInContext(lodashStable.assign({}, root, {
          'Date': lodashStable.assign(function() {
            return { 'getTime': getTime };
          }, {
            'now': Date.now
          })
        }));

        var throttled = lodash.throttle(function() {
          callCount++;
        }, 32);

        throttled();
        throttled();
        throttled();

        setTimeout(function() {
          assert.strictEqual(callCount, 2);
          done();
        }, 64);
      }
      else {
        skipAssert(assert);
        done();
      }
    });

    QUnit.test('should not trigger a trailing call when invoked once', function(assert) {
      assert.expect(2);

      var done = assert.async();

      var callCount = 0,
          throttled = _.throttle(function() { callCount++; }, 32);

      throttled();
      assert.strictEqual(callCount, 1);

      setTimeout(function() {
        assert.strictEqual(callCount, 1);
        done();
      }, 64);
    });

    lodashStable.times(2, function(index) {
      QUnit.test('should trigger a call when invoked repeatedly' + (index ? ' and `leading` is `false`' : ''), function(assert) {
        assert.expect(1);

        var done = assert.async();

        var callCount = 0,
            limit = (argv || isPhantom) ? 1000 : 320,
            options = index ? { 'leading': false } : {};

        var throttled = _.throttle(function() {
          callCount++;
        }, 32, options);

        var start = +new Date;
        while ((new Date - start) < limit) {
          throttled();
        }
        var actual = callCount > 1;

        setTimeout(function() {
          assert.ok(actual);
          done();
        }, 1);
      });
    });

    QUnit.test('should trigger a second throttled call as soon as possible', function(assert) {
      assert.expect(3);

      var done = assert.async();

      var callCount = 0;

      var throttled = _.throttle(function() {
        callCount++;
      }, 128, { 'leading': false });

      throttled();

      setTimeout(function() {
        assert.strictEqual(callCount, 1);
        throttled();
      }, 192);

      setTimeout(function() {
        assert.strictEqual(callCount, 1);
      }, 254);

      setTimeout(function() {
        assert.strictEqual(callCount, 2);
        done();
      }, 384);
    });

    QUnit.test('should apply default options', function(assert) {
      assert.expect(3);

      var done = assert.async();

      var callCount = 0;

      var throttled = _.throttle(function(value) {
        callCount++;
        return value;
      }, 32, {});

      assert.strictEqual(throttled('a'), 'a');
      assert.strictEqual(throttled('b'), 'a');

      setTimeout(function() {
        assert.strictEqual(callCount, 2);
        done();
      }, 128);
    });

    QUnit.test('should support a `leading` option', function(assert) {
      assert.expect(2);

      var withLeading = _.throttle(identity, 32, { 'leading': true });
      assert.strictEqual(withLeading('a'), 'a');

      var withoutLeading = _.throttle(identity, 32, { 'leading': false });
      assert.strictEqual(withoutLeading('a'), undefined);
    });

    QUnit.test('should support a `trailing` option', function(assert) {
      assert.expect(6);

      var done = assert.async();

      var withCount = 0,
          withoutCount = 0;

      var withTrailing = _.throttle(function(value) {
        withCount++;
        return value;
      }, 64, { 'trailing': true });

      var withoutTrailing = _.throttle(function(value) {
        withoutCount++;
        return value;
      }, 64, { 'trailing': false });

      assert.strictEqual(withTrailing('a'), 'a');
      assert.strictEqual(withTrailing('b'), 'a');

      assert.strictEqual(withoutTrailing('a'), 'a');
      assert.strictEqual(withoutTrailing('b'), 'a');

      setTimeout(function() {
        assert.strictEqual(withCount, 2);
        assert.strictEqual(withoutCount, 1);
        done();
      }, 256);
    });

    QUnit.test('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', function(assert) {
      assert.expect(1);

      var done = assert.async();

      var callCount = 0;

      var throttled = _.throttle(function() {
        callCount++;
      }, 64, { 'trailing': false });

      throttled();
      throttled();

      setTimeout(function() {
        throttled();
        throttled();
      }, 96);

      setTimeout(function() {
        assert.ok(callCount > 1);
        done();
      }, 192);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.debounce and lodash.throttle');

  lodashStable.each(['debounce', 'throttle'], function(methodName) {
    var func = _[methodName],
        isDebounce = methodName == 'debounce';

    QUnit.test('`_.' + methodName + '` should not error for non-object `options` values', function(assert) {
      assert.expect(1);

      var pass = true;

      try {
        func(noop, 32, 1);
      } catch (e) {
        pass = false;
      }
      assert.ok(pass);
    });

    QUnit.test('`_.' + methodName + '` should use a default `wait` of `0`', function(assert) {
      assert.expect(1);

      var done = assert.async();

      var callCount = 0;

      var funced = func(function() {
        callCount++;
      });

      funced();

      setTimeout(function() {
        funced();
        assert.strictEqual(callCount, isDebounce ? 1 : 2);
        done();
      }, 32);
    });

    QUnit.test('`_.' + methodName + '` should invoke `func` with the correct `this` binding', function(assert) {
      assert.expect(1);

      var done = assert.async();

      var object = {
        'funced': func(function() { actual.push(this); }, 32)
      };

      var actual = [],
          expected = lodashStable.times(isDebounce ? 1 : 2, lodashStable.constant(object));

      object.funced();
      if (!isDebounce) {
        object.funced();
      }
      setTimeout(function() {
        assert.deepEqual(actual, expected);
        done();
      }, 64);
    });

    QUnit.test('`_.' + methodName + '` supports recursive calls', function(assert) {
      assert.expect(2);

      var done = assert.async();

      var actual = [],
          args = lodashStable.map(['a', 'b', 'c'], function(chr) { return [{}, chr]; }),
          expected = args.slice(),
          queue = args.slice();

      var funced = func(function() {
        var current = [this];
        push.apply(current, arguments);
        actual.push(current);

        var next = queue.shift();
        if (next) {
          funced.call(next[0], next[1]);
        }
      }, 32);

      var next = queue.shift();
      funced.call(next[0], next[1]);
      assert.deepEqual(actual, expected.slice(0, isDebounce ? 0 : 1));

      setTimeout(function() {
        assert.deepEqual(actual, expected.slice(0, actual.length));
        done();
      }, 256);
    });

    QUnit.test('`_.' + methodName + '` should work if the system time is set backwards', function(assert) {
      assert.expect(1);

      var done = assert.async();

      if (!isModularize) {
        var callCount = 0,
            dateCount = 0;

        var getTime = function() {
          return ++dateCount === 4
            ? +new Date(2012, 3, 23, 23, 27, 18)
            : +new Date;
        };

        var lodash = _.runInContext(lodashStable.assign({}, root, {
          'Date': lodashStable.assign(function() {
            return { 'getTime': getTime, 'valueOf': getTime };
          }, {
            'now': Date.now
          })
        }));

        var funced = lodash[methodName](function() {
          callCount++;
        }, 32);

        funced();

        setTimeout(function() {
          funced();
          assert.strictEqual(callCount, isDebounce ? 1 : 2);
          done();
        }, 64);
      }
      else {
        skipAssert(assert);
        done();
      }
    });

    QUnit.test('`_.' + methodName + '` should support cancelling delayed calls', function(assert) {
      assert.expect(1);

      var done = assert.async();

      var callCount = 0;

      var funced = func(function() {
        callCount++;
      }, 32, { 'leading': false });

      funced();
      funced.cancel();

      setTimeout(function() {
        assert.strictEqual(callCount, 0);
        done();
      }, 64);
    });

    QUnit.test('`_.' + methodName + '` should reset `lastCalled` after cancelling', function(assert) {
      assert.expect(3);

      var done = assert.async();

      var callCount = 0;

      var funced = func(function() {
        return ++callCount;
      }, 32, { 'leading': true });

      assert.strictEqual(funced(), 1);
      funced.cancel();

      assert.strictEqual(funced(), 2);
      funced();

      setTimeout(function() {
        assert.strictEqual(callCount, 3);
        done();
      }, 64);
    });

    QUnit.test('`_.' + methodName + '` should support flushing delayed calls', function(assert) {
      assert.expect(2);

      var done = assert.async();

      var callCount = 0;

      var funced = func(function() {
        return ++callCount;
      }, 32, { 'leading': false });

      funced();
      assert.strictEqual(funced.flush(), 1);

      setTimeout(function() {
        assert.strictEqual(callCount, 1);
        done();
      }, 64);
    });

    QUnit.test('`_.' + methodName + '` should noop `cancel` and `flush` when nothing is queued', function(assert) {
      assert.expect(2);

      var done = assert.async();

      var callCount = 0;

      var funced = func(function() {
        callCount++;
      }, 32);

      funced.cancel();
      assert.strictEqual(funced.flush(), undefined);

      setTimeout(function() {
        assert.strictEqual(callCount, 0);
        done();
      }, 64);
    });
  });

//-----------------

QUnit.module('trim methods');

  lodashStable.each(['trim', 'trimStart', 'trimEnd'], function(methodName, index) {
    var func = _[methodName],
        parts = [];

    if (index != 2) {
      parts.push('leading');
    }
    if (index != 1) {
      parts.push('trailing');
    }
    parts = parts.join(' and ');

    QUnit.test('`_.' + methodName + '` should remove ' + parts + ' whitespace', function(assert) {
      assert.expect(1);

      var string = whitespace + 'a b c' + whitespace,
          expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

      assert.strictEqual(func(string), expected);
    });

    QUnit.test('`_.' + methodName + '` should coerce `string` to a string', function(assert) {
      assert.expect(1);

      var object = { 'toString': lodashStable.constant(whitespace + 'a b c' + whitespace) },
          expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

      assert.strictEqual(func(object), expected);
    });

    QUnit.test('`_.' + methodName + '` should remove ' + parts + ' `chars`', function(assert) {
      assert.expect(1);

      var string = '-_-a-b-c-_-',
          expected = (index == 2 ? '-_-' : '') + 'a-b-c' + (index == 1 ? '-_-' : '');

      assert.strictEqual(func(string, '_-'), expected);
    });

    QUnit.test('`_.' + methodName + '` should coerce `chars` to a string', function(assert) {
      assert.expect(1);

      var object = { 'toString': lodashStable.constant('_-') },
          string = '-_-a-b-c-_-',
          expected = (index == 2 ? '-_-' : '') + 'a-b-c' + (index == 1 ? '-_-' : '');

      assert.strictEqual(func(string, object), expected);
    });

    QUnit.test('`_.' + methodName + '` should return an empty string for empty values and `chars`', function(assert) {
      assert.expect(6);

      lodashStable.each([null, '_-'], function(chars) {
        assert.strictEqual(func(null, chars), '');
        assert.strictEqual(func(undefined, chars), '');
        assert.strictEqual(func('', chars), '');
      });
    });

    QUnit.test('`_.' + methodName + '` should work with `undefined` or empty string values for `chars`', function(assert) {
      assert.expect(2);

      var string = whitespace + 'a b c' + whitespace,
          expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

      assert.strictEqual(func(string, undefined), expected);
      assert.strictEqual(func(string, ''), string);
    });

    QUnit.test('`_.' + methodName + '` should work as an iteratee for methods like `_.map`', function(assert) {
      assert.expect(1);

      var string = Object(whitespace + 'a b c' + whitespace),
          trimmed = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : ''),
          actual = lodashStable.map([string, string, string], func);

      assert.deepEqual(actual, [trimmed, trimmed, trimmed]);
    });

    QUnit.test('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', function(assert) {
      assert.expect(1);

      if (!isNpm) {
        var string = whitespace + 'a b c' + whitespace,
            expected = (index == 2 ? whitespace : '') + 'a b c' + (index == 1 ? whitespace : '');

        assert.strictEqual(_(string)[methodName](), expected);
      }
      else {
        skipAssert(assert);
      }
    });

    QUnit.test('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function(assert) {
      assert.expect(1);

      if (!isNpm) {
        var string = whitespace + 'a b c' + whitespace;
        assert.ok(_(string).chain()[methodName]() instanceof _);
      }
      else {
        skipAssert(assert);
      }
    });
  });
//-----------

QUnit.module('union methods');

  lodashStable.each(['union', 'unionBy', 'unionWith'], function(methodName) {
    var args = (function() { return arguments; }(1, 2, 3)),
        func = _[methodName];

    QUnit.test('`_.' + methodName + '` should return the union of the given arrays', function(assert) {
      assert.expect(1);

      var actual = func([1, 3, 2], [5, 2, 1, 4], [2, 1]);
      assert.deepEqual(actual, [1, 3, 2, 5, 4]);
    });

    QUnit.test('`_.' + methodName + '` should not flatten nested arrays', function(assert) {
      assert.expect(1);

      var actual = func([1, 3, 2], [1, [5]], [2, [4]]);
      assert.deepEqual(actual, [1, 3, 2, [5], [4]]);
    });

    QUnit.test('`_.' + methodName + '` should ignore values that are not arrays or `arguments` objects', function(assert) {
      assert.expect(3);

      var array = [0];
      assert.deepEqual(func(array, 3, { '0': 1 }, null), array);
      assert.deepEqual(func(null, array, null, [2, 1]), [0, 2, 1]);
      assert.deepEqual(func(array, null, args, null), [0, 1, 2, 3]);
    });
  });

  /*--------------------------------------------------------------------------*/

  QUnit.module('lodash.uniq');

  (function() {
    QUnit.test('should perform an unsorted uniq when used as an iteratee for methods like `_.map`', function(assert) {
      assert.expect(1);

      var array = [[2, 1, 2], [1, 2, 1]],
          actual = lodashStable.map(array, lodashStable.uniq);

      assert.deepEqual(actual, [[2, 1], [1, 2]]);
    });
  }());

  //------------

  QUnit.module('uniq methods');
  
    lodashStable.each(['uniq', 'uniqBy', 'uniqWith', 'sortedUniq', 'sortedUniqBy'], function(methodName) {
      var func = _[methodName],
          isSorted = /^sorted/.test(methodName),
          objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }, { 'a': 3 }, { 'a': 1 }];
  
      if (isSorted) {
        objects = _.sortBy(objects, 'a');
      }
      else {
        QUnit.test('`_.' + methodName + '` should return unique values of an unsorted array', function(assert) {
          assert.expect(1);
  
          var array = [2, 3, 1, 2, 3, 1];
          assert.deepEqual(func(array), [2, 3, 1]);
        });
      }
      QUnit.test('`_.' + methodName + '` should return unique values of a sorted array', function(assert) {
        assert.expect(1);
  
        var array = [1, 1, 2, 2, 3];
        assert.deepEqual(func(array), [1, 2, 3]);
      });
  
      QUnit.test('`_.' + methodName + '` should treat object instances as unique', function(assert) {
        assert.expect(1);
  
        assert.deepEqual(func(objects), objects);
      });
  
      QUnit.test('`_.' + methodName + '` should not treat `NaN` as unique', function(assert) {
        assert.expect(1);
  
        assert.deepEqual(func([1, 3, NaN, NaN]), [1, 3, NaN]);
      });
  
      QUnit.test('`_.' + methodName + '` should work with large arrays', function(assert) {
        assert.expect(1);
  
        var largeArray = [],
            expected = [0, {}, 'a'],
            count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);
  
        lodashStable.each(expected, function(value) {
          lodashStable.times(count, function() {
            largeArray.push(value);
          });
        });
  
        assert.deepEqual(func(largeArray), expected);
      });
  
      QUnit.test('`_.' + methodName + '` should work with large arrays of boolean, `NaN`, and nullish values', function(assert) {
        assert.expect(1);
  
        var largeArray = [],
            expected = [null, undefined, false, true, NaN],
            count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);
  
        lodashStable.each(expected, function(value) {
          lodashStable.times(count, function() {
            largeArray.push(value);
          });
        });
  
        assert.deepEqual(func(largeArray), expected);
      });
  
      QUnit.test('`_.' + methodName + '` should work with large arrays of symbols', function(assert) {
        assert.expect(1);
  
        if (Symbol) {
          var largeArray = lodashStable.times(LARGE_ARRAY_SIZE, Symbol);
          assert.deepEqual(func(largeArray), largeArray);
        }
        else {
          skipAssert(assert);
        }
      });
  
      QUnit.test('`_.' + methodName + '` should work with large arrays of well-known symbols', function(assert) {
        assert.expect(1);
  
        // See http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols.
        if (Symbol) {
          var expected = [
            Symbol.hasInstance, Symbol.isConcatSpreadable, Symbol.iterator,
            Symbol.match, Symbol.replace, Symbol.search, Symbol.species,
            Symbol.split, Symbol.toPrimitive, Symbol.toStringTag, Symbol.unscopables
          ];
  
          var largeArray = [],
              count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);
  
          expected = lodashStable.map(expected, function(symbol) {
            return symbol || {};
          });
  
          lodashStable.each(expected, function(value) {
            lodashStable.times(count, function() {
              largeArray.push(value);
            });
          });
  
          assert.deepEqual(func(largeArray), expected);
        }
        else {
          skipAssert(assert);
        }
      });
  
      QUnit.test('`_.' + methodName + '` should distinguish between numbers and numeric strings', function(assert) {
        assert.expect(1);
  
        var largeArray = [],
            expected = ['2', 2, Object('2'), Object(2)],
            count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);
  
        lodashStable.each(expected, function(value) {
          lodashStable.times(count, function() {
            largeArray.push(value);
          });
        });
  
        assert.deepEqual(func(largeArray), expected);
      });
    });

//-------------

QUnit.module('values methods');

  lodashStable.each(['values', 'valuesIn'], function(methodName) {
    var args = (function() { return arguments; }(1, 2, 3)),
        func = _[methodName],
        isValues = methodName == 'values';

    QUnit.test('`_.' + methodName + '` should get string keyed values of `object`', function(assert) {
      assert.expect(1);

      var object = { 'a': 1, 'b': 2 },
          actual = func(object).sort();

      assert.deepEqual(actual, [1, 2]);
    });

    QUnit.test('`_.' + methodName + '` should work with an object that has a `length` property', function(assert) {
      assert.expect(1);

      var object = { '0': 'a', '1': 'b', 'length': 2 },
          actual = func(object).sort();

      assert.deepEqual(actual, [2, 'a', 'b']);
    });

    QUnit.test('`_.' + methodName + '` should ' + (isValues ? 'not ' : '') + 'include inherited string keyed property values', function(assert) {
      assert.expect(1);

      function Foo() {
        this.a = 1;
      }
      Foo.prototype.b = 2;

      var expected = isValues ? [1] : [1, 2],
          actual = func(new Foo).sort();

      assert.deepEqual(actual, expected);
    });
  });

//--------------

QUnit.module('lodash.unzip and lodash.zip');

  lodashStable.each(['unzip', 'zip'], function(methodName, index) {
    var func = _[methodName];
    func = lodashStable.bind(index ? func.apply : func.call, func, null);

    var object = {
      'an empty array': [
        [],
        []
      ],
      '0-tuples': [
        [[], []],
        []
      ],
      '2-tuples': [
        [['barney', 'fred'], [36, 40]],
        [['barney', 36], ['fred', 40]]
      ],
      '3-tuples': [
        [['barney', 'fred'], [36, 40], [false, true]],
        [['barney', 36, false], ['fred', 40, true]]
      ]
    };

    lodashStable.forOwn(object, function(pair, key) {
      QUnit.test('`_.' + methodName + '` should work with ' + key, function(assert) {
        assert.expect(2);

        var actual = func(pair[0]);
        assert.deepEqual(actual, pair[1]);
        assert.deepEqual(func(actual), actual.length ? pair[0] : []);
      });
    });

    QUnit.test('`_.' + methodName + '` should work with tuples of different lengths', function(assert) {
      assert.expect(4);

      var pair = [
        [['barney', 36], ['fred', 40, false]],
        [['barney', 'fred'], [36, 40], [undefined, false]]
      ];

      var actual = func(pair[0]);
      assert.ok('0' in actual[2]);
      assert.deepEqual(actual, pair[1]);

      actual = func(actual);
      assert.ok('2' in actual[0]);
      assert.deepEqual(actual, [['barney', 36, undefined], ['fred', 40, false]]);
    });

    QUnit.test('`_.' + methodName + '` should treat falsey values as empty arrays', function(assert) {
      assert.expect(1);

      var expected = lodashStable.map(falsey, alwaysEmptyArray);

      var actual = lodashStable.map(falsey, function(value) {
        return func([value, value, value]);
      });

      assert.deepEqual(actual, expected);
    });

    QUnit.test('`_.' + methodName + '` should ignore values that are not arrays or `arguments` objects', function(assert) {
      assert.expect(1);

      var array = [[1, 2], [3, 4], null, undefined, { '0': 1 }];
      assert.deepEqual(func(array), [[1, 3], [2, 4]]);
    });

    QUnit.test('`_.' + methodName + '` should support consuming its return value', function(assert) {
      assert.expect(1);

      var expected = [['barney', 'fred'], [36, 40]];
      assert.deepEqual(func(func(func(func(expected)))), expected);
    });
  });

//-----------  
