"use client";

import { type FC } from "react";

const FeedSkeleton: FC = () => {
  return (
    <div className="w-full flex group p-5 relative animate-pulse">
      <div className="flex flex-col w-[67%] pr-10">
        <span className="w-full h-7 rounded w-bg-primary" />
        <span className="mt-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full w-bg-primary" />
          <span className="w-20 h-4 rounded w-bg-primary" />
        </span>
      </div>
      <span className="w-[33%]">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded w-bg-primary" />
      </span>
    </div>
  );
};

export default FeedSkeleton;
