import { z } from "zod";

const tagSchema = z.object({
  pid: z.string().nullable().optional(),
  p_name: z.string(),
  p_fbname: z.string(),
});

export { tagSchema };
