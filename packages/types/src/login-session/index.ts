import { Email } from "../email";

export enum LoginProvider {
  FB = "fb",
  TWITCH = "twitch",
}

export interface LoginSession {
  loginBy: LoginProvider | "fb" | "twitch";
  id: string;
  email: Email;
  name: string;
}
