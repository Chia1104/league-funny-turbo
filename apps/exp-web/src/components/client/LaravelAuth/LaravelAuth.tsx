"use client";

import { type FC, type ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { laravelLogin } from "@/helpers/api/client";
import { useSessionStorage } from "usehooks-ts";
import { signOut, useSession } from "next-auth/react";

const LaravelAuth: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [laravelSession, setLaravelSession] = useSessionStorage<string | null>(
    "laravel-session",
    null
  );
  const { mutate } = useMutation(laravelLogin, {
    onSuccess: (data) => {
      setLaravelSession(JSON.stringify(data.data));
    },
  });

  return <>{children}</>;
};
