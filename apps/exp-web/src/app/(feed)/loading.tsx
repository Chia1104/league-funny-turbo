import { FeedSkeleton } from "@/components/client/FeedList";
import { Fragment } from "react";

const HomeLoading = () => {
  return (
    <div className="w-full">
      <div className="w-full w-bg-secondary rounded-lg shadow-lg">
        {[0, 1, 2, 3].map((item, index) => {
          return (
            <Fragment key={index}>
              <FeedSkeleton />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HomeLoading;
