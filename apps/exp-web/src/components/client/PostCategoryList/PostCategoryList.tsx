"use client";

import { type FC, use } from "react";
import type { PostCategory } from "@wanin/types";
import Link from "next/link";
import { fetchSidebar } from "@/helpers/api/client";
import { useQuery } from "@tanstack/react-query";
import { ListLoader } from "@/components/client/PostCategoryList";
import { makeQueryClient } from "@/utils/make-query-client.util";

interface ListProps {
  bord: PostCategory[];
}

const queryClient = makeQueryClient();

const PostCategoryList: FC = () => {
  // const {
  //   data: bord,
  //   isError,
  //   isLoading,
  //   isSuccess,
  // } = useQuery<PostCategory[]>(["sidebar"], fetchSidebar);
  //
  // return (
  //   <>
  //     {isLoading && <ListLoader />}
  //     {isSuccess && <List bord={bord as PostCategory[]} />}
  //     {isError && <h3 className="text-danger">error</h3>}
  //   </>
  // );
  const bord = use(queryClient("sidebar", fetchSidebar));
  return <List bord={bord as PostCategory[]} />;
};

const List: FC<ListProps> = ({ bord }) => {
  return (
    <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full">
      {bord.map((category) => (
        <div key={category.group_id} className="my-3">
          <h2 className="w-subtitle">{category.group_name}</h2>
          {category.contents.map((detail) => (
            <p key={detail.b_id} className="my-1">
              <Link
                scroll
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
