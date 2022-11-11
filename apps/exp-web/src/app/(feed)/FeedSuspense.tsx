"use client";

import { Suspense, type ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

const FeedSuspense = ({
  children,
  canPending = false,
}: {
  children: ReactNode;
  canPending?: boolean;
}) => {
  const selectedLayoutSegments = useSelectedLayoutSegments();
  if (canPending)
    return (
      <Suspense
        fallback={
          <h1 className="text-2xl font-bold text-center">HOME LOADING!!!</h1>
        }>
        {children}
      </Suspense>
    );
  return <>{children}</>;
};

export default FeedSuspense;
