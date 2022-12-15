import { fetcher, IApiResponse } from "@/utils/fetcher.util";
import type { LoginSession, User } from "@wanin/shared/types";

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

export { laravelLogin };
