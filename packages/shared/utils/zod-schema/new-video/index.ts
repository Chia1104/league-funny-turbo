import { z } from "zod";
import { tagSchema } from "../tag";
import { titleSchema } from "../new-post";

const ytShortRegex = /(http|https):\/\/youtu\.be\/([a-z|A-Z|_|\-|0-9|\/]+)/i;
const ytRegex =
  /\s*[a-zA-Z\/\/:\.]*youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i;
const twitchShortRegex = /https:\/\/clips.twitch.tv\/([a-z|A-Z|_|\-|0-9|\/]+)/i;
const twitchRegex =
  /https:\/\/www\.twitch\.tv\/([a-z|A-Z|_|\-|0-9|\/]+)\/clip\/([a-z|A-Z|_|\-|0-9|\/]+)/i;

const video_urlSchema = z
  .string()
  .regex(ytShortRegex)
  .optional()
  .or(z.string().regex(ytRegex).optional())
  .or(z.string().regex(twitchShortRegex).optional())
  .or(z.string().regex(twitchRegex).optional())
  .or(z.string().length(0));
const commentSchema = z.string().optional();

const videoUrlsSchema = z.object({
  video_url: video_urlSchema,
  comment: commentSchema,
});

const newVideoSchema = z.object({
  title: titleSchema,
  videoUrls: z.array(videoUrlsSchema).min(1).max(30),
  tags: z.array(tagSchema).max(10).optional(),
  gameType: z.string(),
  catalogue: z.number().min(1),
});

export { newVideoSchema, video_urlSchema, commentSchema };
