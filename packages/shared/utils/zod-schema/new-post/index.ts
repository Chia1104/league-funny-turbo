import { z } from "zod";
import { tagSchema } from "../tag";

const titleSchema = z.string().min(1).max(50);

const newPostSchema = z.object({
  title: titleSchema,
  content: z.string().min(1),
  cover: z.string().optional(),
  tags: z.array(tagSchema).max(10).optional(),
  gameType: z.string(),
  catalogue: z.number().min(1),
});

export { newPostSchema, titleSchema };
