const memo = <T extends (...args: any[]) => any>(
  func: T,
  time?: number
): ((...arg: Parameters<T>) => ReturnType<T>) => {
  if (
    typeof func !== 'function' ||
    (time && time <= 0) ||
    (typeof time !== 'number' && time !== null && time !== undefined)
  )
    throw new Error('INVALID_ARGUMENT');

  let cache = new Map();

  return function (...args) {
    if (time === undefined) time = Infinity;

    const keyArgs = JSON.stringify(args);

    if (cache.has(keyArgs)) {
      const entry = cache.get(keyArgs);

      if (entry.expiresAt >= Date.now()) {
        return entry.value;
      } else {
        cache.delete(keyArgs);
      }
    }

    const value = func.apply(this, args);

    cache.set(keyArgs, {
      value,
      expiresAt: Date.now() + time,
    });

    return value;
  };
};

export default memo;
