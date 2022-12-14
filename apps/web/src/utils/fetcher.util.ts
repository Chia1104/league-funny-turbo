import { ApiResponseStatus } from "@wanin/shared/types";
import { setSearchParams } from "@wanin/shared/utils";
import { API_URL } from "@/shared/constants";
import { type JWT } from "next-auth/jwt";

interface IApiResponse<T = unknown> {
  statusCode: number;
  status: ApiResponseStatus;
  data?: T;
  message?: string;
}

interface IFetcherOptions {
  requestInit?: RequestInit;
  endpoint?: string;
  params?: Record<string, string>;
  path?: string;
  useAuth?: {
    useAdmin?: boolean;
  };
}

const authToken = async (): Promise<
  IApiResponse<{ token: JWT; raw: string }>
> => {
  try {
    const res = await fetch("/api/user/detail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res.status !== 200) {
      return {
        statusCode: res.status,
        status: ApiResponseStatus.ERROR,
        message: "Unauthorized",
      } satisfies Pick<IApiResponse, "statusCode" | "status" | "message">;
    }
    const { token, raw } = await res.json();
    return {
      statusCode: res.status,
      status: ApiResponseStatus.SUCCESS,
      data: { token, raw },
    } satisfies Pick<
      IApiResponse<{ token: JWT; raw: string }>,
      "statusCode" | "status" | "data"
    >;
  } catch (e) {
    return {
      statusCode: 500,
      status: ApiResponseStatus.ERROR,
      message: "Internal Server Error",
    } satisfies Pick<IApiResponse, "statusCode" | "status" | "message">;
  }
};

const fetcher = async <T = unknown>(
  options: IFetcherOptions
): Promise<IApiResponse<T>> => {
  const { requestInit = {}, endpoint, params, path, useAuth } = options;
  let raw = "";
  let token = {} as JWT;
  if (useAuth) {
    const { data, message, status, statusCode } = await authToken();
    if (status !== ApiResponseStatus.SUCCESS) {
      return { message, statusCode, status } satisfies Pick<
        IApiResponse,
        "statusCode" | "status" | "message"
      >;
    }
    raw = data?.raw as string;
    token = data?.token as JWT;
    if (useAuth.useAdmin && !token?.a) {
      return {
        statusCode: 401,
        status: ApiResponseStatus.ERROR,
        message: "Unauthorized",
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
      `${endpoint || API_URL}${path || ""}?${searchParams}`,
      {
        headers: {
          ...requestInit["headers"],
          ...(useAuth && { Authorization: `Bearer ${raw}` }),
        },
        ...requestInit,
      }
    );
    const data = (await res.json()) as IApiResponse<T>;
    if (res.status !== 200 && data?.status !== ApiResponseStatus.SUCCESS) {
      return {
        statusCode: res.status,
        status: ApiResponseStatus.ERROR,
        message: data?.message ?? "Something went wrong",
      } satisfies Pick<IApiResponse, "statusCode" | "status" | "message">;
    }
    return {
      statusCode: res.status,
      status: ApiResponseStatus.SUCCESS,
      data: data?.data,
    } satisfies Pick<IApiResponse<T>, "statusCode" | "status" | "data">;
  } catch (e) {
    return {
      statusCode: 500,
      status: ApiResponseStatus.ERROR,
      message: "Internal Server Error",
    } satisfies Pick<IApiResponse, "statusCode" | "status" | "message">;
  }
};

export { fetcher };
export type { IFetcherOptions, IApiResponse };
