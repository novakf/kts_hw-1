const lengthSort = (a: string, b: string) => {
  if (a.length > b.length) {
    return 1;
  }
  if (a.length < b.length) {
    return -1;
  }
  return 0;
};

const sortSymbols = (a: string, b: string) => {
  return a.localeCompare(b);
};

const sort = (str: string) => {
  if (typeof str !== 'string') throw new Error('INVALID_ARGUMENT');

  let result: string[] = [];
  let words = str.split(' ');

  words.forEach((word) => {
    let sorted = word.toLowerCase().split('').sort(sortSymbols).join('');
    result.push(sorted);
  });

  return result.sort(lengthSort).join(' ');
};

export default sort;
