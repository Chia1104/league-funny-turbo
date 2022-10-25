import { useEffect, useState } from "react";
import type { OdataResult } from "@wanin/types";
import { setSearchParams } from "@wanin/utils";

export interface UseInfiniteQueryOptions<T = any> {
  url: string;
  page?: number;
  top?: number;
  skip?: number;
  searchParams?: Record<string, string>;
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
  const {
    url,
    initData = [],
    page = 1,
    top = 20,
    skip = 0,
    searchParams,
  } = option;
  const [data, setData] = useState<T[]>(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${url}?${setSearchParams({
            searchParams: {
              page: page.toString(),
              top: top.toString(),
              skip: skip.toString(),
              ...searchParams,
            },
          })}`
        );
        const result = (await response.json()) as OdataResult<T[]>;
        if (response.status !== 200) {
          setIsError(true);
          setIsSuccess(false);
          setHasMore(false);
          return;
        }
        if ((result.value as T[]).length === 0) {
          setHasMore(false);
        }
        setData((prevData) => [...prevData, ...(result.value as T[])]);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, top, skip]);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    hasMore,
  };
};

export default useInfiniteQuery;
