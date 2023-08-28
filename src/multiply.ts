const multiply = (first: number) => {
  if (typeof first !== 'number') throw new Error('INVALID_ARGUMENT');

  return (second: number) => {
    if (typeof second !== 'number') throw new Error('INVALID_ARGUMENT');
    return first * second;
  };
};

export default multiply;
