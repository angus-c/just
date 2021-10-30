import once from './index';

{
	const plusOne = (num: number) => num + 1
	const test: (num: number) => number = once(plusOne);
}
{
	const log = () => {
		console.log('test');
	}
	const test: () => void = once(log);
}

// Not OK
// @ts-expect-error
once();
// @ts-expect-error
once(null);
// @ts-expect-error
once(1);
// @ts-expect-error
once('test');
// @ts-expect-error
once([]);
// @ts-expect-error
once({});
