import { PostCategoryList } from "@/components/client";
import {
  LiveIcon,
  PostIcon,
  RocketIcon,
  ShopIcon,
  TimeLineIcon,
} from "@/lib/ui";
import { Size } from "@wanin/types";
import Link from "next/link";
import { type ReactNode } from "react";

const FeedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-container flex px-5">
      <aside className="h-screen z-10 sticky top-0 hidden md:flex md:flex-col min-w-[270px] md:mr-4 md:pr-5 pt-[70px]">
        <ul className="w-bg-secondary h-full my-10 rounded-lg p-5 flex flex-col gap-1 shadow-lg overflow-y-scroll no-scrollbar">
          {/*<button onClick={toggle}>Toggle Theme</button>*/}
          <li>
            <Link
              href="/"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <PostIcon size={Size.Base} className="mr-3" />
              亂貼
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <LiveIcon size={Size.Base} className="mr-3" />
              直播
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <RocketIcon size={Size.Base} className="mr-3" />
              任務
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <ShopIcon size={Size.Base} className="mr-3" />
              商城
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <TimeLineIcon size={Size.Base} className="mr-3" />
              實況軸
            </Link>
          </li>
          <hr className="my-3" />
          {/*<Suspense fallback={<div>Loading...</div>}>*/}
          {/*  <PostCategoryList />*/}
          {/*</Suspense>*/}
          <PostCategoryList />
        </ul>
      </aside>
      <div className="w-full w-main">{children}</div>
    </div>
  );
};

export default FeedLayout;
