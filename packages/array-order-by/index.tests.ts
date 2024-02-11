import orderBy from './index';

// OK
orderBy(['a', 'b', 'c']);
orderBy([1, 2, 3]);
orderBy([{name: 'claudio'}, {name: 'klaus'}]);
orderBy(
  [{name: 'claudio'}, {name: 'klaus'}],
  [{property: 'name', order: 'desc'}]
);
orderBy(
  [
    {user: 'fabio', details: {city: 'Milan', age: 34}},
    {user: 'max', details: {city: 'Munich', age: 29}},
    {user: 'zacarias', details: {city: 'Sao Paulo', age: 44}},
  ],
  [
    {
      property(v) {
        return v.details.city;
      },
      order: 'desc',
    },
  ]
);

// NOT OK
// @ts-expect-error
orderBy();
// @ts-expect-error
orderBy({});
// @ts-expect-error
orderBy({}, 'name');
// @ts-expect-error
orderBy({}, function() {});
// @ts-expect-error
orderBy([1, 2, 3], 1);
// @ts-expect-error
orderBy([1, 2, 3], []);
// @ts-expect-error
orderBy([1, 2, 3], [{}]);
// @ts-expect-error
orderBy([1, 2, 3], {});
