import { Email } from "../email";

enum LoginProvider {
  FB = "facebook",
  TWITCH = "twitch",
}

interface LoginSession {
  loginBy: LoginProvider | "facebook" | "twitch";
  id: string;
  email: Email;
  name: string;
  imgUrl?: string;
  ip?: string;
}

export { LoginProvider, type LoginSession };
