import squash from "./index";

// OK
const test1: "thecatsatonthemat" = squash("the cat sat on the mat");
const test2: "thecatsatonthemat" = squash(" the cat sat on the mat ");
const test3: "\tthecat\nsat\fon\vthe\rmat" = squash(
  "\tthe cat\n sat \fon \vthe \rmat "
);
const test4: "thecatsatonthemat" = squash(
  "\tthe cat\n sat \fon \vthe \rmat ",
  true
);
const test5: "\tthecat\nsat\fon\vthe\rmat" = squash(
  "\tthe cat\n sat \fon \vthe \rmat ",
  false
);
const test6: "thecatsatonthemat" = squash(
  `the cat
sat on the mat`,
  true
);

// Not OK
// @ts-expect-error
squash([]);
// @ts-expect-error
squash(124.43);
// @ts-expect-error
squash({});
// @ts-expect-error
squash(true);
// @ts-expect-error
squash(false);
// @ts-expect-error
squash("hi", []);
// @ts-expect-error
squash("hi", {});
// @ts-expect-error
squash("hi", 1);
// @ts-expect-error
squash("hi", "a");
