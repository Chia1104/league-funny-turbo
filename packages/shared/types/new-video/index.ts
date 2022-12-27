import { TagDTO } from "../tag";

export interface VideoUrlsDTO {
  id?: number | null | undefined;
  video_url: string | undefined;
  comment: string | undefined;
}

interface VideoUrls {
  video_url: string | undefined;
  comment: string | undefined;
}

export interface NewVideoDTO {
  title: string;
  videoUrls: VideoUrls[];
  tags: TagDTO[];
  gameType: string;
  catalogue: number;
  ip?: string;
}
