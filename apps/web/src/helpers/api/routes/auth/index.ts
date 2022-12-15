import { fetcher, IApiResponse } from "@/utils/fetcher.util";
import type { LoginSession, User } from "@wanin/shared/types";
import type { JWT } from "next-auth/jwt";
import { getBaseUrl } from "@/utils/get-base-url";

const laravelLogin = async (
  loginSession: LoginSession
): Promise<IApiResponse<User>> => {
  return await fetcher<User>({
    path: "/api/login",
    requestInit: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginSession),
    },
  });
};

const getToken = async (): Promise<
  IApiResponse<{ raw: string; token: JWT }>
> => {
  return await fetcher<{ raw: string; token: JWT }>({
    endpoint: getBaseUrl(),
    path: "/api/auth/token",
    requestInit: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    },
  });
};

export { laravelLogin, getToken };
