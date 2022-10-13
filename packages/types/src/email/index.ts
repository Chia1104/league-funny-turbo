import { z } from "zod";

export const emailValidator = z.string().email();
export type Email = z.infer<typeof emailValidator>;
