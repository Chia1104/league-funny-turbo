import { Email } from "../email";

enum LoginProvider {
  FB = "fb",
  TWITCH = "twitch",
}

interface LoginSession {
  loginBy: LoginProvider | "fb" | "twitch";
  id: string;
  email: Email;
  name: string;
  imgUrl: string;
  ip?: string;
}

export { LoginProvider, type LoginSession };
