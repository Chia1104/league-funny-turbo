import { type ApiResponse, ApiResponseStatus } from "@wanin/shared/types";
import { setSearchParams } from "@wanin/shared/utils";
import { BASE_URL } from "@/shared/constants";

interface IFetcherOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  endpoint?: string;
  params?: Record<string, string>;
  path?: string;
  useAuth?: boolean;
}

const authToken = async (): Promise<
  Partial<ApiResponse<{ token: string }> & { message: string }>
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
      };
    }
    const { token } = await res.json();
    return {
      statusCode: res.status,
      status: ApiResponseStatus.SUCCESS,
      data: { token },
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: ApiResponseStatus.ERROR,
      message: "Internal Server Error",
    };
  }
};

const fetcher = async <T = any>(
  options: IFetcherOptions
): Promise<Partial<ApiResponse<T> & { message: string }>> => {
  const {
    method = "GET",
    headers = {},
    body,
    endpoint,
    params,
    path,
    useAuth,
  } = options;
  let token = "";
  if (useAuth) {
    const { data, message, status, statusCode } = await authToken();
    if (status === ApiResponseStatus.ERROR) {
      return { message, statusCode, status };
    }
    token = data?.token as string;
  }
  const searchParams = setSearchParams({
    searchParams: {
      ...params,
    },
  });
  const _headers = {
    ...headers,
    ...(useAuth ? { Authorization: `Bearer ${token}` } : {}),
  };
  try {
    const res = await fetch(
      `${endpoint || BASE_URL}${path || ""}?${searchParams}`,
      {
        method,
        headers: _headers,
        body: JSON.stringify(body),
      }
    );
    const data = (await res.json()) as ApiResponse<T>;
    if (res.status !== 200 && data?.status !== ApiResponseStatus.SUCCESS) {
      return {
        statusCode: res.status,
        status: ApiResponseStatus.ERROR,
        message: "Something went wrong",
      };
    }
    return {
      statusCode: res.status,
      status: ApiResponseStatus.SUCCESS,
      data: data.data,
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: ApiResponseStatus.ERROR,
      message: "Internal Server Error",
    };
  }
};

export { fetcher };
export type { IFetcherOptions };
