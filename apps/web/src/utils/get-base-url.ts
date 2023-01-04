import { BASE_URL, RAILWAY_URL, VERCEL_URL, HOST } from "@/shared/constants";

interface Options {
  isServer?: boolean;
}

export const getBaseUrl = (options?: Options) => {
  options ??= {};
  const { isServer } = options;
  if (typeof window !== "undefined" && !isServer) {
    return "";
  }

  if (RAILWAY_URL) {
    return `https://${RAILWAY_URL}`;
  }

  if (VERCEL_URL) {
    return `https://${VERCEL_URL}`;
  }

  return BASE_URL;
};

export const getHostName = (baseUrl?: string) => {
  if (RAILWAY_URL) {
    return RAILWAY_URL;
  }

  if (VERCEL_URL) {
    return VERCEL_URL;
  }

  return HOST ?? new URL(baseUrl ?? BASE_URL).hostname;
};
