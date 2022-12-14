import { TagDTO } from "../tag";

export interface VideoUrlsDTO {
  video_url: string | null;
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
