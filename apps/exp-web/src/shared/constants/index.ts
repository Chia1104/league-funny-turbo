export const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Site url
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.league-funny.com"
    : "http://localhost:3001";
export const RAILWAY_URL = process.env.RAILWAY_STATIC_URL;
export const VERCEL_URL = process.env.VERCEL_URL;

export const API_URL = process.env.API_URL;

export const HOST = IS_PRODUCTION ? "league-funny.com" : "localhost";

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const FACEBOOK_ID = process.env.FACEBOOK_ID;
export const FACEBOOK_SECRET = process.env.FACEBOOK_SECRET;
export const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
export const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
export const TOKEN_EXPIRE =
  parseInt(process.env.TOKEN_EXPIRE as string) || 60 * 60 * 24 * 30;
