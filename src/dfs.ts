const checkObjectType = (value: any) => {
  return value !== 'null' && value?.constructor === {}.constructor;
};

const dfs = (graph: any) => {
  if (!checkObjectType(graph)) throw new Error('INVALID_ARGUMENT');

  let result: string[] = [];

  const getChilds = (parent: string) => {
    result.push(parent);
    graph[parent].forEach((child: string) => {
      getChilds(child);
    });
  };

  getChilds(Object.keys(graph)[0]);

  return result;
};

export default dfs;
