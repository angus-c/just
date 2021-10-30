/**
 * Finds the score that is required to be above a percentile of a distribution of scores. Uses R7 formula described in the [nist spec](https://www.itl.nist.gov/div898/handbook/prc/section2/prc262.htm)
 *
 * For example, the 50th percentile is the score at which 50% of the distribution is less than the value
 *
 * @param arr The distibution of values
 * @param percentage The fractional percentage
 * @example
 * percentile([1, 2, 3], 0.0); // => 1
 * percentile([1, 2, 3], 0.5); // => 2
 * percentile([1, 2, 3], 1.0); // => 3
 * percentile([15, 20, 35, 40, 50], .40); // => 26
 */
export default function percentile(arr: number[], percentage: number): number
