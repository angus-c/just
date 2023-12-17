import pipe from './index';

// Case 1) Value and 1 function
pipe('hello', a => a.concat(' world'));

// Case 2) Value and 2 functions
pipe(
  5,
  a => a * 2,
  b => b + 1
);

// Case 3) Value and 9 functions
pipe(
  {},
  a => ({
    ...a,
    field: 'text',
  }),
  b => b.field,
  c => c.concat(' value'),
  d => d.length,
  Math.sqrt,
  f => f * f,
  g => new Date(g),
  h => h.toJSON(),
  i => i.trim(),
);

//@ts-expect-error
pipe();

//@ts-expect-error
pipe(5);

const arr: unknown[] = [];
//@ts-expect-error
pipe(arr, Math.sqrt);
