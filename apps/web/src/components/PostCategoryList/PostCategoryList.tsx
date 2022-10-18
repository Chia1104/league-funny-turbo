import type { FC } from "react";
import { Link } from "@/components";
import type { PostCategory } from "@wanin/types";
import { encodeString } from "@wanin/utils";

interface Props {
  categories: PostCategory[];
}

const PostCategoryList: FC<Props> = ({ categories }) => {
  return (
    <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full">
      {categories.map((category) => (
        <div key={category.group_id} className="my-3">
          <h2 className="w-subtitle">
            <Link href={`/l/${encodeString(category.group_name)}`}>
              <a className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                {category.group_name}
              </a>
            </Link>
          </h2>
          {category.contents.map((detail) => (
            <p key={detail.b_id}>
              <Link
                href={`/l/${encodeString(category.group_name)}/${
                  detail.b_type
                }`}>
                <a className="ml-4 flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                  {detail.b_zh_name}
                </a>
              </Link>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PostCategoryList;
