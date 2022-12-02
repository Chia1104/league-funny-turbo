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
}

export { LoginProvider, type LoginSession };
