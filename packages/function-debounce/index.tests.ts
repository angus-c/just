import debounce = require("./index");

// OK
debounce(() => {});
debounce(() => {}, 50);
debounce(() => {}, 200, true);
debounce(() => {}, 1000, false);
debounce(() => {}, 50).cancel();
debounce(() => {}, 200, true).cancel();
debounce(() => {}, 1000, false).cancel();

// not OK
// @ts-expect-error
debounce();
// @ts-expect-error
debounce().cancel();
// @ts-expect-error
debounce({}, 50).cancel();
// @ts-expect-error
debounce({});
// @ts-expect-error
debounce({}, 50);
// @ts-expect-error
debounce({}, 50, true);
// @ts-expect-error
debounce(50);
// @ts-expect-error
debounce(50, true);
// @ts-expect-error
debounce(() => {}, {}, false);
// @ts-expect-error
debounce(() => {}, 200, 'hi');
