import compose = require('./index');

// Fixtures
let fa: (s: string, n: number) => boolean;
let fb: (b: boolean) => [];
let fc: (c: []) => 0;
let fd: (d: 0) => '';
let fe: (e: '') => null;
let ff: (f: null) => void;

let fx: (x: boolean) => boolean;

// OK

// Single argument
let sa: (s: string, n: number) => boolean = compose(fa);
let sb: (s: string, n: number, b: boolean) => boolean = compose(fa);

// Multiple arguments
let ma: (s: string, n: number) => [] = compose(fa, fb);
let mb: (s: string, n: number) => 0 = compose(fa, fb, fc);
let mc: (s: string, n: number) => '' = compose(fa, fb, fc, fd);
let md: (s: string, n: number) => null = compose(fa, fb, fc, fd, fe);
let me: (s: string, n: number) => void = compose(fa, fb, fc, fd, fe, ff);
let mf: (s: string, n: number) => boolean = compose(fa, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx);
let mg: (s: string, n: number) => [] = compose(fa, fb, fc, fd, fe, ff, fx, fb);

// Example code in README
const sqRootBiggest: (...xs: number[]) => number = compose(Math.max, Math.sqrt, Math.trunc);

// Not OK

// Single argument
// @ts-expect-error
let sae: (s: string, n: number) => string = compose(fa);
// @ts-expect-error
let sbe: (s: string, n: string) => boolean = compose(fa);
// @ts-expect-error
let sce: (s: string) => boolean = compose(fa);
// @ts-expect-error
compose(0);
// @ts-expect-error
compose('');
// @ts-expect-error
compose({});

// Multiple arguments
// @ts-expect-error
compose(fa, fc);
// @ts-expect-error
compose(fa, fb, fd);
// @ts-expect-error
compose(fa, fb, fc, fe);
// @ts-expect-error
compose(fa, fb, fc, fd, ff);
// @ts-expect-error
compose(fa, fb, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx);
// @ts-expect-error
let mae: (s: string, n: number) => string = compose(fa, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx);
// @ts-expect-error
compose(0, fb);
// @ts-expect-error
compose(fa, 0);
// @ts-expect-error
compose(fa, fb, 0);
// @ts-expect-error
compose(fa, fb, fc, 0);
// @ts-expect-error
compose(fa, fb, fc, fd, 0);
// @ts-expect-error
compose(fa, fb, fc, fd, fe, 0);
// @ts-expect-error
compose(fa, fb, fc, fd, fe, ff, 0);
// @ts-expect-error
compose(fa, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, fx, 0);
