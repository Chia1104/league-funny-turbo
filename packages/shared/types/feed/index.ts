export type FeedTag = {
  pid: string;
  p_name: string;
  p_fbname?: string;
};

export type Feed = {
  fid: number;
  f_type: string;
  f_game_type: string;
  f_cat: number;
  f_cover: string;
  f_fb_cover: string;
  f_desc: string;
  f_attachment: string;
  f_author_name: string;
  f_uid: number;
  f_commentcount: number;
  f_views: number;
  f_up: number;
  f_down: number;
  f_hot: number;
  f_v_hot: number;
  f_dateline: number;
  f_tags_info: FeedTag[];
  f_displayorder: number;
  f_collectcount: number;
  f_report: number;
  f_o_recommend: number;
  f_is_gold: number;
  f_promo_views: number;
};
