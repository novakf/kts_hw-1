const checkObjectType = (value: any) => {
  return value !== 'null' && value?.constructor === {}.constructor;
};

const getNumberProps = (obj: any) => {
  if (!checkObjectType(obj)) throw new Error('INVALID_ARGUMENT');

  let result: string[] = [];

  const objProps = (obj: any) => {
    for (let key in obj) {
      if (typeof obj[key] === 'number') result.push(key);
      if (checkObjectType(obj[key])) objProps(obj[key]);
    }
  };

  objProps(obj);

  return result.sort();
};

export default getNumberProps;
