import type { FC, ReactNode } from "react";
import { Link, PostCategoryList, Banner } from "@/components";
import {
  PostIcon,
  LiveIcon,
  RocketIcon,
  ShopIcon,
  TimeLineIcon,
} from "@wanin/ui";
import { Size } from "@wanin/types";
import data from "@/shared/data/post-category.json";
import { useDarkMode } from "@/hooks";

interface Props {
  categories?: any;
  children: ReactNode;
}

const PostLayout: FC<Props> = (props) => {
  const { categories = data, children } = props;
  const { toggle } = useDarkMode();
  return (
    <div className="w-container flex">
      <aside className="h-screen z-10 sticky top-0 hidden md:flex md:flex-col min-w-[270px] md:mr-4 md:pr-5 pt-[70px]">
        <ul className="w-bg-secondary h-full my-10 rounded-lg p-5 flex flex-col gap-1 shadow-lg overflow-y-scroll no-scrollbar">
          <button onClick={toggle}>Toggle Theme</button>
          <li>
            <Link href="/">
              <a className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                <PostIcon size={Size.Base} className="mr-3" />
                亂貼
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                <LiveIcon size={Size.Base} className="mr-3" />
                直播
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                <RocketIcon size={Size.Base} className="mr-3" />
                任務
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                <ShopIcon size={Size.Base} className="mr-3" />
                商城
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                <TimeLineIcon size={Size.Base} className="mr-3" />
                實況軸
              </a>
            </Link>
          </li>
          <hr className="my-3" />
          <PostCategoryList categories={categories} />
        </ul>
      </aside>
      <main className="w-full w-main">{children}</main>
      <Banner>
        <div>
          <h3 className="text-2xl font-bold">This is AD area</h3>
        </div>
      </Banner>
    </div>
  );
};

export default PostLayout;
