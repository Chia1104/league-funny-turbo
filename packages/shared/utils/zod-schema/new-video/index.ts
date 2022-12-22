import { z } from "zod";
import { tagSchema } from "../tag";
import { titleSchema } from "../new-post";

const video_urlSchema = z.string().min(1);
const commentSchema = z.string().min(1);

const videoUrlsSchema = z.object({
  video_url: video_urlSchema,
  comment: commentSchema,
});

const newVideoSchema = z.object({
  title: titleSchema,
  videoUrls: z.array(videoUrlsSchema).min(1).max(10),
  tags: z.array(tagSchema).max(10).optional(),
  gameType: z.string(),
  catalogue: z.number().min(1),
});

export { newVideoSchema, video_urlSchema, commentSchema };
