import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import { getBaseUrl } from "@/utils/get-base-url";
import type { AppRouter } from "@wanin/trpc-api";
import { transformer } from "@wanin/trpc-api/transformer";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: true,
}) as any;
