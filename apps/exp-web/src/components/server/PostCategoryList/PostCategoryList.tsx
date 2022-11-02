import { type FC } from "react";
import type { PostCategory } from "@wanin/types";
import { getBaseUrl } from "@/utils/get-base-url";
import { asyncComponent } from "@wanin/utils";
import Link from "next/link";

interface ListProps {
  board: PostCategory[];
}

const PostCategoryList: FC = asyncComponent(async () => {
  const board = (await fetch(`${getBaseUrl()}/api/main-bord`).then((res) =>
    res.json()
  )) as PostCategory[];

  return <List board={board} />;
});

const List: FC<ListProps> = ({ board }) => {
  return (
    <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full">
      {board.map((category) => (
        <div key={category.group_id} className="my-3">
          <h2 className="w-subtitle">{category.group_name}</h2>
          {category.contents.map((detail) => (
            <p key={detail.b_id} className="my-1">
              <Link
                href={`/${detail.b_type}`}
                className="ml-4 flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                {detail.b_zh_name}
              </Link>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PostCategoryList;
