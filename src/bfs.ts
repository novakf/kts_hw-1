const checkObjectType = (value: any) => {
  return value !== 'null' && value?.constructor === {}.constructor;
};

const bfs = (graph: any) => {
  if (!checkObjectType(graph)) throw new Error('INVALID_ARGUMENT');

  let root = Object.keys(graph)[0];

  let result: string[] = [root];

  const levelCover = (level: string[]) => {
    let nextLevel: string[] = [];

    //формируем массив из всех потомков родителей одного уровня
    level.forEach((parent) => {
      graph[parent].forEach((child: string) => {
        nextLevel.push(child);
      });
    });

    result = [...result, ...nextLevel];

    //завершаем рекурсию, если потомков на следующем уровне нет, иначе продолжаем
    if (nextLevel.length !== 0) levelCover(nextLevel);
  };

  levelCover([root]);

  return result;
};

export default bfs;
