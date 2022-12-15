import { TagDTO } from "../tag";

export interface VideoUrlsDTO {
  video_url: string;
  comment: string;
}

export interface NewVideoDTO {
  title: string;
  videoUrls: VideoUrlsDTO[];
  tags: TagDTO[];
  gameType: string;
  catalogue: number;
  ip?: string;
}
