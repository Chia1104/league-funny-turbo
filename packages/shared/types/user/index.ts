import { Email } from "../email";

export type User = {
  uid: number;
  fbid: string;
  page_fans_pid: number;
  fbmail: Email;
  u_name: string;
  admin_id: number;
  ban: number;
  u_dateline: number;
  u_logged: number;
  u_lastcomment_time: number;
  u_lastpost_time: number;
  u_upline_times: number;
  u_mail_not_read: number;
  u_mission_not_read: number;
  u_achievement_not_read: number;
  u_noti_not_read: number;
  mail_verify: number;
  u_twitch_id: string;
  u_twitch_email: Email;
};

export type UserInfo = {
  uid: number;
  u_exp: number;
  u_golds: number;
  u_lv: number;
};
