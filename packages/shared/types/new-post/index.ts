import { TagDTO } from "../tag";

export interface NewPostDTO {
  title: string;
  content: string;
  cover: string;
  tags: TagDTO[];
  gameType: string;
  catalogue: number;
  ip?: string;
}
