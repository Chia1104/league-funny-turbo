import { z } from "zod";

const titleSchema = z.string().min(1).max(50);

const newPostSchema = z.object({
  title: titleSchema,
  content: z.string().min(1),
  cover: z.string().optional(),
  gameType: z.string().min(1),
  catalogue: z.number().min(1),
});

export { newPostSchema, titleSchema };
