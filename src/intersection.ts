const typeCheck = (value: any): boolean => {
  return typeof value !== 'number';
};

const intersection = (arr1: number[], arr2: number[]): number[] => {
  if (arr1 === undefined || arr2 === undefined)
    throw new Error('INVALID_ARGUMENTS_COUNT');
  if (Array.isArray(arr1) === false || Array.isArray(arr2) === false)
    throw new Error('INVALID_ARGUMENT');
  if (arr1.some(typeCheck) === true || arr2.some(typeCheck) === true)
    throw new Error('INVALID_ELEMENT_IN_ARRAY');

  let result: number[] = [];

  arr1.forEach((num) => {
    if (arr2.includes(num) === true && result.includes(num) === false)
      result.push(num);
  });

  return result;
};

export default intersection;
