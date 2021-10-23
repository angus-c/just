import sortBy from './index'

// OK
sortBy(['a', 'b', 'c']);
sortBy([1, 2, 3]);
sortBy([{name: 'claudio'}, {name: 'klaus'}]);
sortBy([{name: 'claudio'}, {name: 'klaus'}], 'name');
sortBy([
  {user: 'fabio', details: {city: "Milan", age: 34}},
  {user: 'max', details: {city: "Munich", age: 29}},
  {user: 'zacarias', details: {city: "Sao Paulo", age: 44}},
], function(o) {
  return o.details.age;
});

// NOT OK
// @ts-expect-error
sortBy();
// @ts-expect-error
sortBy({});
// @ts-expect-error
sortBy({}, 'name');
// @ts-expect-error
sortBy({}, function(){});
// @ts-expect-error
sortBy([1, 2, 3], 1);
// @ts-expect-error
sortBy([1, 2, 3], []);
// @ts-expect-error
sortBy([1, 2, 3], {});
