import { LoginProvider } from "../../../types";
import { emailSchema } from "../email";
import { z } from "zod";

const loginProviderSchema = z.nativeEnum(LoginProvider);

const loginSessionSchema = z.object({
  loginBy: loginProviderSchema,
  id: z.string(),
  email: emailSchema,
  name: z.string(),
  imgUrl: z.string(),
  ip: z.string().optional(),
});

export { loginProviderSchema, loginSessionSchema };
