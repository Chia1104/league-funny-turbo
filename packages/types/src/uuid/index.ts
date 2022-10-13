import { z } from "zod";

export const uuidValidator = z.string().uuid();

export type UUID = z.infer<typeof uuidValidator>;
