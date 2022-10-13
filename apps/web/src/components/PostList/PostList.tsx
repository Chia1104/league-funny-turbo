import type { FC } from "react";
import type { Post } from "@wanin/db";
import PostItem from "./PostItem";

interface Props {
  isLoading: boolean;
  isError?: boolean;
  errorMessages?: string[];
  posts: Post[];
}

const PostList: FC<Props> = (props) => {
  const { isLoading, isError = false, errorMessages, posts } = props;
  return (
    <div className="w-full w-bg-secondary rounded-lg shadow-lg">
      {isLoading && (
        <div className="w-full h-96 flex justify-center items-center">
          <div className="w-10 h-10 border-2 border-primary rounded-full animate-spin" />
        </div>
      )}
      {isError && (
        <div className="w-full h-96 flex justify-center items-center">
          {errorMessages?.map((message) => (
            <p className="text-center">{message}</p>
          ))}
        </div>
      )}
      {!isLoading &&
        !isError &&
        posts.map((post) => (
          <div key={post.id}>
            <PostItem post={post} />
            {posts.at(-1)?.id !== post.id && (
              <hr className="dark:border-gray-700" />
            )}
          </div>
        ))}
    </div>
  );
};

export default PostList;
