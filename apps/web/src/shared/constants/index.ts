export const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Site url
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.league-funny.com"
    : "http://localhost:3000";
export const RAILWAY_URL = process.env.RAILWAY_STATIC_URL;
export const VERCEL_URL = process.env.VERCEL_URL;

export const API_URL = process.env.API_URL;
