export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const RAILWAY_URL = process.env.RAILWAY_STATIC_URL;
export const VERCEL_URL = process.env.VERCEL_URL;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const HOST = process.env.NEXT_PUBLIC_HOST;
export const PORT = process.env.PORT || 3000;

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "secret";
export const FACEBOOK_ID = process.env.FACEBOOK_ID;
export const FACEBOOK_SECRET = process.env.FACEBOOK_SECRET;
export const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
export const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
export const TOKEN_EXPIRE =
  parseInt(process.env.TOKEN_EXPIRE as string) || 60 * 60 * 24 * 30;
export const FROALA_KEY = process.env.NEXT_PUBLIC_FROALA_KEY;
export const S3_UPLOAD_KEY = process.env.S3_UPLOAD_KEY;
export const S3_UPLOAD_SECRET = process.env.S3_UPLOAD_SECRET;
export const S3_UPLOAD_BUCKET = process.env.S3_UPLOAD_BUCKET;
export const S3_UPLOAD_REGION = process.env.S3_UPLOAD_REGION;
