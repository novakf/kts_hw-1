const multiplication = (base: number, exp: number) => {
  if (typeof base !== 'number' || typeof exp !== 'number')
    throw new Error('INVALID_ARGUMENT');

  let result = base;
  for (let i = 1; i < Math.abs(exp); i++) {
    result *= base;
  }

  if (exp < 0) return 1 / result;
  if (exp === 0) return 1;
  return result;
};

const pow = (...args: number[]) => {
  if (args.length === 2) {
    return multiplication(args[0], args[1]);
  } else {
    return (exp: number) => multiplication(args[0], exp);
  }
};

export default pow;
