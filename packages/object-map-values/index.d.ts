// Original definitions by: Roman Lerchster <https://github.com/wa4-fearless-otter>
declare function mapValues<TInput extends {}, TMappedValue>(
  item: TInput,
  callback: (
    value: TInput[keyof TInput],
    key: keyof TInput,
    object: TInput
  ) => TMappedValue
): { [k in keyof TInput]: ReturnType<typeof callback> };

export default mapValues;
