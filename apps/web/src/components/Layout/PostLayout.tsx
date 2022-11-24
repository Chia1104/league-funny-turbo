import type { FC, ReactNode } from "react";
import { PostCategoryList, Banner } from "@/components";
import {
  PostIcon,
  LiveIcon,
  RocketIcon,
  ShopIcon,
  TimeLineIcon,
} from "@wanin/ui";
import { Size } from "@wanin/types";
import { useDarkMode } from "@/hooks";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

const PostLayout: FC<Props> = (props) => {
  const { children } = props;
  const { toggle } = useDarkMode();
  return (
    <div className="w-container flex px-5">
      <aside className="h-screen z-10 sticky top-0 hidden md:flex md:flex-col min-w-[270px] md:mr-4 md:pr-5 pt-[70px]">
        <ul className="w-bg-secondary h-full my-10 rounded-lg p-5 flex flex-col gap-1 shadow-lg overflow-y-scroll no-scrollbar">
          <button onClick={toggle}>Toggle Theme</button>
          <li>
            <Link
              href="/l"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <PostIcon size={Size.Base} className="mr-3" />
              亂貼
            </Link>
          </li>
          <li>
            <Link
              href="/l"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <LiveIcon size={Size.Base} className="mr-3" />
              直播
            </Link>
          </li>
          <li>
            <Link
              href="/l"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <RocketIcon size={Size.Base} className="mr-3" />
              任務
            </Link>
          </li>
          <li>
            <Link
              href="/l"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <ShopIcon size={Size.Base} className="mr-3" />
              商城
            </Link>
          </li>
          <li>
            <Link
              href="/l"
              className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
              <TimeLineIcon size={Size.Base} className="mr-3" />
              實況軸
            </Link>
          </li>
          <hr className="my-3" />
          <PostCategoryList />
        </ul>
      </aside>
      <div className="w-full w-main">{children}</div>
      <Banner>
        <div>
          <h3 className="text-2xl font-bold">This is AD area</h3>
        </div>
      </Banner>
    </div>
  );
};

export default PostLayout;
