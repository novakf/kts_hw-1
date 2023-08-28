const typeCheck = (value: any): boolean => {
  return typeof value !== 'string';
};

const sorted = (value: string): string => {
  return value.toLowerCase().split('').sort().join('');
};

const removeAnagrams = (words: string[]): string[] => {
  if (Array.isArray(words) === false) throw new Error('INVALID_ARGUMENT');
  if (words.some(typeCheck) === true)
    throw new Error('INVALID_ELEMENT_IN_ARRAY');

  let sortedWords: string[] = [];
  let anagrams: string[] = [];

  words.forEach((word) => {
    if (sortedWords.includes(sorted(word))) anagrams.push(sorted(word));
    sortedWords.push(sorted(word));
  });
  let result: string[] = [];

  words.forEach((word) => {
    if (anagrams.some((anagram) => anagram === sorted(word)) === false)
      result.push(word)
  });

  return result;
};

export default removeAnagrams;
