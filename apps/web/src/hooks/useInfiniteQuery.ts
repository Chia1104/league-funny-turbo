import { useEffect, useState } from "react";
import type { Result } from "@wanin/types";

export interface UseInfiniteQueryOptions<T = any> {
  url: string;
  page: number;
  initData?: T[];
}

export interface UseInfiniteQueryResult<T = any> {
  data: T[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  hasMore: boolean;
}

const useInfiniteQuery = <T = any>(
  option: UseInfiniteQueryOptions<T>
): UseInfiniteQueryResult<T> => {
  const { url, initData = [], page } = option;
  const [data, setData] = useState<T[]>(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async (page: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}?page=${page}`);
        const result = (await response.json()) as Result<T[]>;
        if (response.status !== 200) {
          setIsError(true);
          setIsSuccess(false);
          setHasMore(false);
          return;
        }
        if ((result.data as T[]).length === 0) {
          setHasMore(false);
        }
        setData((prevData) => [...prevData, ...(result.data as T[])]);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(page);
  }, [page]);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    hasMore,
  };
};

export default useInfiniteQuery;
