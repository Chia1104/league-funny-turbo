"use client";

import type { FC } from "react";

const CommentSkeleton: FC = () => {
  return (
    <div className="w-full flex flex-col group p-5 relative animate-pulse">
      <span className="my-3 flex items-center gap-2">
        <span className="w-6 h-6 rounded-full w-bg-primary" />
        <span className="w-20 h-4 rounded w-bg-primary" />
      </span>
      <div className="w-full flex flex-col gap-3">
        {[0, 1, 2].map((item, i) => (
          <span key={item} className="w-full h-4 rounded-full w-bg-primary" />
        ))}
      </div>
    </div>
  );
};

export default CommentSkeleton;
