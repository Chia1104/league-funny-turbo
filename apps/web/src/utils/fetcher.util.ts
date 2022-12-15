import { ApiResponseStatus } from "@wanin/shared/types";
import { setSearchParams } from "@wanin/shared/utils";
import { API_URL } from "@/shared/constants";
import { type JWT } from "next-auth/jwt";
import { networkConfig, errorConfig } from "@/shared/config/network.config";

interface IApiResponse<T = unknown> {
  statusCode: number;
  status: ApiResponseStatus;
  data?: T;
  message?: string;
}

interface IFetcherOptions {
  requestInit?: RequestInit;

  /**
   * @description
   * The endpoint of the API, default is `API_URL`(laravel api)
   */
  endpoint?: string;

  /**
   * @description
   * The search params of the API (query string)
   */
  params?: Record<string, string>;
  path?: string;

  /**
   * @description
   * Only on client side, if you want to use auth token on server side,
   * use `getToken()` on server and pass it to `requestInit` instead.
   */
  useAuth?: {
    token?: JWT | null;
    raw?: string | null;
    useAdmin?: boolean;
  };
}

const getErrorMessages = (statusCode: number): string => {
  return (
    errorConfig[statusCode as keyof typeof errorConfig] ?? errorConfig[500]
  );
};

const fetcher = async <T = unknown>(
  options: IFetcherOptions
): Promise<IApiResponse<T>> => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const { requestInit = {}, endpoint, params, path, useAuth } = options;
  if (useAuth) {
    if (typeof window === "undefined") {
      throw new Error(
        "Only on client side, if you want to use auth token on server side, use `getToken()` on server and pass it to `requestInit` instead."
      );
    }
    if (!useAuth.raw || !useAuth.token) {
      return {
        statusCode: 401,
        status: ApiResponseStatus.ERROR,
        message: getErrorMessages(401),
      } satisfies Pick<IApiResponse, "statusCode" | "status" | "message">;
    }
    if (useAuth.useAdmin && !useAuth.token?.a) {
      return {
        statusCode: 401,
        status: ApiResponseStatus.ERROR,
        message: getErrorMessages(401),
      } satisfies Pick<IApiResponse, "statusCode" | "status" | "message">;
    }
  }
  const searchParams = setSearchParams({
    searchParams: {
      ...params,
    },
  });
  try {
    const res = await fetch(
      `${endpoint ?? API_URL}${path ?? ""}${
        searchParams && `?${searchParams}`
      }`,
      {
        ...requestInit,
        headers: {
          ...requestInit["headers"],
          ...(useAuth && { Authorization: `Bearer ${useAuth.raw}` }),
        },
        signal: signal,
      }
    );
    setTimeout(() => abortController.abort(), networkConfig["timeout"]);
    const _data = (await res.json()) as IApiResponse<T>;
    if (!res.ok && _data?.status !== ApiResponseStatus.SUCCESS) {
      return {
        statusCode: res.status ?? 400,
        status: ApiResponseStatus.ERROR,
        message:
          _data?.message ??
          getErrorMessages(res.status as keyof typeof errorConfig),
      } satisfies Pick<IApiResponse, "statusCode" | "status" | "message">;
    }
    return {
      statusCode: res.status,
      status: ApiResponseStatus.SUCCESS,
      data: _data?.data,
    } satisfies Pick<IApiResponse<T>, "statusCode" | "status" | "data">;
  } catch (e) {
    return {
      statusCode: 500,
      status: ApiResponseStatus.ERROR,
      message: getErrorMessages(500),
    } satisfies Pick<IApiResponse, "statusCode" | "status" | "message">;
  }
};

export { fetcher };
export type { IFetcherOptions, IApiResponse };
