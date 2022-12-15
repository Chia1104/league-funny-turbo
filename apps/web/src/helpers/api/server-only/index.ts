import { API_URL } from "@/shared/constants";
import type { ApiResponse, LoginSession, User } from "@wanin/shared/types";

const laravelLogin = async (
  loginSession: LoginSession
): Promise<ApiResponse<User[]>> => {
  const data = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(loginSession),
  });
  return data.json();
};

export { laravelLogin };
