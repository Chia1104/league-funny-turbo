export type Board = {
  b_id: number;
  b_type: string;
  b_zh_name: string;
  b_en_name: string;
  b_twitch_name: string;
  b_fanspage: string;
  b_up_text: string;
  b_down_text: string;
  b_online: number;
  b_cover: string;
  b_rule: string;
  b_slogan: string;
  keyword: string;
  adminer: {
    u_id: number;
    u_name: string;
  }[];
};
