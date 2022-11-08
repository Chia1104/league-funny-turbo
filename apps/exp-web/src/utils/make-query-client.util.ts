export const makeQueryClient = () => {
  const fetchMap = new Map<string, Promise<any>>();
  return function queryClient<QueryResult>(
    key: string,
    fetcher: () => Promise<QueryResult>
  ) {
    if (!fetchMap.has(key)) {
      fetchMap.set(key, fetcher());
    }
    return fetchMap.get(key)!;
  };
};
