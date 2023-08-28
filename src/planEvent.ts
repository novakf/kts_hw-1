const planEvent = (cb: () => void, timeout: number) => {
  if (typeof cb !== 'function' || typeof timeout !== 'number')
    throw new Error('INVALID_ARGUMENT');

  return new Promise((resolve) => {
    if (timeout <= 0) resolve(cb());
    else setTimeout(() => resolve(cb()), timeout);
  });
};

export default planEvent;
