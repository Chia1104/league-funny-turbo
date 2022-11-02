"use client";

import { useEffect } from "react";
import { Page, Button } from "@/lib/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Page className="w-main w-full">
      <h1>Something went wrong!</h1>
      <Button onClick={() => reset()} text="Reset error boundary" />
    </Page>
  );
}
