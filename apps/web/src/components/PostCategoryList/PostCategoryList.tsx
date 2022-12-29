import { type FC } from "react";
import type { PostCategory } from "@wanin/shared/types";
import Link from "next/link";
import { fetchSidebar } from "@/helpers/api/routes/others";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import { useRouter } from "next/router";
import ListLoader from "./ListLoader";
import { ApiResponseStatus } from "@wanin/shared/types";

interface ListProps {
  bord: PostCategory[];
}

const fetcher = async (): Promise<PostCategory[]> => {
  const { data, status, statusCode } = await fetchSidebar();
  if (statusCode !== 200 || status !== ApiResponseStatus.SUCCESS || !data)
    throw new Error("error");
  return data;
};

const PostCategoryList: FC = () => {
  const {
    data: bord,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<PostCategory[]>(["sidebar"], fetcher, {
    staleTime: 500000, // 5 minutes
  });

  return (
    <>
      {isLoading && <ListLoader />}
      {isSuccess && <List bord={bord as PostCategory[]} />}
      {isError && <h3 className="text-danger">error</h3>}
    </>
  );
};

const List: FC<ListProps> = ({ bord }) => {
  const router = useRouter();
  return (
    <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full">
      {bord.map((category) => (
        <div key={category.group_id} className="my-3">
          <h2 className="w-subtitle">{category.group_name}</h2>
          {category.contents.map((detail) => (
            <p key={detail.b_id} className="my-1">
              <Link
                shallow
                scroll
                href={`/b/${detail.b_type}`}
                className={cx(
                  "ml-4 flex hover:bg-gray-100 dark:hover:bg-black p-2 rounded-lg transition duration-300 ease-in-out",
                  detail.b_type.toLowerCase() ===
                    ((router.query?.b_type as string) ?? "")?.toLowerCase() &&
                    "bg-gray-100 dark:bg-black"
                )}>
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
