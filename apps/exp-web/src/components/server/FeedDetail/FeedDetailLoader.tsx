import { type FC } from "react";

const FeedDetailLoader: FC = () => {
  return (
    <div className="w-full w-bg-secondary rounded-lg p-7 flex flex-col overflow-hidden animate-pulse">
      <div className="mb-7 h-6 w-bg-primary rounded-full" />
      <div className="mb-5 flex items-center">
        <div className="w-10 h-10 rounded-full w-bg-primary" />
        <div className="ml-3 h-4 w-20 w-bg-primary rounded-full" />
      </div>
      <div className="mb-5 flex items-center">
        <div className="h-4 w-40 w-bg-primary rounded-full" />
      </div>
      <hr className="dark:border-gray-700 mb-7" />
      <div className="w-full mb-10">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded w-bg-primary rounded-xl" />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="mb-3 h-4 w-full w-bg-primary rounded-full" />
      ))}
    </div>
  );
};

export default FeedDetailLoader;
