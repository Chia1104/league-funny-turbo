import { Email, emailSchema } from "../email";
import { z } from "zod";

enum LoginProvider {
  FB = "fb",
  TWITCH = "twitch",
}

const loginProviderSchema = z.nativeEnum(LoginProvider);

interface LoginSession {
  loginBy: LoginProvider | "fb" | "twitch";
  id: string;
  email: Email;
  name: string;
}

const loginSessionSchema = z.object({
  loginBy: loginProviderSchema,
  id: z.string(),
  email: emailSchema,
  name: z.string(),
});

export {
  LoginProvider,
  loginProviderSchema,
  type LoginSession,
  loginSessionSchema,
};
