import { UserInfo } from "../user";

export type Comment = {
  c_id: number;
  c_ups: boolean | string[];
  c_downs: boolean | string[];
  c_content: string;
  c_uid: number;
  c_author_name: string;
  c_dateline: number;
  c_displayorder: number;
  user_info: UserInfo;
  reply: Comment[];
};
