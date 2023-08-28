const sum = (...args: number[]): number => {
  if (args.length < 2) throw new Error('INVALID_ARGUMENTS_COUNT');

  const result = args.reduce((acc, val) => {
    if (typeof val !== 'number') throw new Error('INVALID_ARGUMENT');
    return acc + val;
  }, 0);

  return result;
};

export default sum;
