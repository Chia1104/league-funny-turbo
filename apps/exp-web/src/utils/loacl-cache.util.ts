export const loaclCache = () => {
  const cache = new Map<string, any>();
  const set = (key: string, value: any, ttl: number) => {
    cache.set(key, value);
    setTimeout(() => {
      cache.delete(key);
    }, ttl);
  };
  const get = (key: string) => {
    return cache.get(key);
  };
  return { set, get };
};
