import throttle from './index'

//OK

throttle(() => 'foo', 0);
throttle(() => 'foo', 100);

throttle(() => 'foo', 200, {});
throttle(() => 'foo', 300, {leading: false, trailing: false});
throttle(() => 'foo', 400, {leading: true, trailing: false});
throttle(() => 'foo', 500, {leading: false, trailing: true});
throttle(() => 'foo', 600, {leading: true, trailing: true});

throttle(() => 'foo', 100).cancel();
throttle(() => 'foo', 200, {}).cancel();
throttle(() => 'foo', 400, {leading: true, trailing: false}).cancel();

throttle(() => 'foo', 100).flush();
throttle(() => 'foo', 200, {}).flush();
throttle(() => 'foo', 400, {leading: true, trailing: false}).flush();

// not OK

// @ts-expect-error
throttle();
// @ts-expect-error
throttle({});
// @ts-expect-error
throttle({}, 200, {leading: false, trailing: false});
// @ts-expect-error
throttle(() => 'foo');
// @ts-expect-error
throttle(() => 'foo', {});
// @ts-expect-error
throttle(() => 'foo', {leading: false, trailing: false});
// @ts-expect-error
throttle(() => 'foo', 200, {leading: false, middle: false});
