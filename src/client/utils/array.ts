export const groupBy = <T extends Record<string, unknown>, K extends keyof T>(
  array: T[],
  key: K
) => {
  return array.reduce((map, current) => {
    const list = map.get(current[key]);
    if (list == null) {
      map.set(current[key], [current]);
    } else {
      list.push(current);
    }
    return map;
  }, new Map<T[K], T[]>());
};
