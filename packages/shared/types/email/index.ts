import { z } from "zod";
import { emailSchema } from "../../utils/zod-schema/email";

export type Email = z.infer<typeof emailSchema>;
