type FunctionType<T> = () => Promise<T> | T;

// Получить из массива функций перечисление результатов их вызовов
// (в случае возврата промиса учитывается именно результат промиса)
type FunctionResultsUnion<
  T extends FunctionType<any>[] | Readonly<FunctionType<any>[]>
> = {
  [K in keyof T]: Awaited<ReturnType<T[K]>>;
}[number];

//возвращает отсортированный по значениям ключей список значений объекта
const sortValuesByKeys = <
  T extends FunctionType<any>[] | Readonly<FunctionType<any>[]>
>(obj: {
  [key: string]: FunctionResultsUnion<T>;
}) => {
  let sorted: any = Object.values(obj).sort((a, b) => {
    let firstKey = '';
    let secondKey = '';
    for (let index in obj) {
      if (obj[index] === a) firstKey = index;
      if (obj[index] === b) secondKey = index;
    }

    return Number(firstKey) - Number(secondKey);
  });

  return sorted;
};

const promiseFrame = async <
  T extends FunctionType<any>[] | Readonly<FunctionType<any>[]>,
  ResultsT = FunctionResultsUnion<T>
>(
  functions: T,
  limit?: number
): Promise<ResultsT[]> => {
  if (
    !Array.isArray(functions) ||
    (limit && limit < 0) ||
    limit === 0 ||
    (typeof limit !== 'number' && limit !== null && limit !== undefined)
  )
    throw new Error('INVALID_ARGUMENT');

  if (!limit || limit >= functions.length) {
    return Promise.all(functions.map(async (asyncFn) => await asyncFn()));
  }

  return new Promise((resolve, reject) => {
    const results: ResultsT[] = [];
    let promises: Promise<void>[] = [];
    let index = 0;
    //объект, в котором ключ - порядок вызова функции, значение - результат работы функции
    let callOrder = {};

    const processFunc = () => {
      if (
        index === functions.length &&
        index === Object.values(callOrder).length
      ) {
        resolve(sortValuesByKeys(callOrder));
      }

      while (index < functions.length && promises.length < limit) {
        const func = functions[index];
        let serial = index;

        const promise = func();

        //если функция асинхронная
        if (promise.then) {
          promise
            .then((result: ResultsT) => {
              callOrder[serial] = result;
              results.push(result);
              promises.splice(promises.indexOf(promise), 1);
              processFunc();
            })
            .catch((error: string) => {
              reject(error);
            });
          promises.push(promise);
        } else {
          //для синхронной функции
          try {
            callOrder[serial] = promise;
            results.push(promise);
            if (results.length === functions.length) {
              resolve(results);
              return;
            }
            console.log(promise, results);
          } catch (error) {
            reject(error);
          }
        }
        index++;
      }
    };

    processFunc();
  });
};

export default promiseFrame;
