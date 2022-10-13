import type { FC } from "react";
import { Link } from "@/components";
import { PostCategory } from "@wanin/types";

interface Props {
  categories: PostCategory[];
}

const PostCategoryList: FC<Props> = ({ categories }) => {
  return (
    <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full">
      {categories.map((category) => (
        <div key={category.id} className="my-3">
          <h2 className="w-subtitle">
            <Link href={`/l/${category.slug}`}>
              <a className="flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                {category.name}
              </a>
            </Link>
          </h2>
          {category.category.map((detail) => (
            <p key={detail.id}>
              <Link href={`/l/${category.slug}/${detail.slug}`}>
                <a className="ml-4 flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg">
                  {detail.name}
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
