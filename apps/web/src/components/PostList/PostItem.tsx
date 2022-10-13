import type { FC } from "react";
import { Image } from "@/components";
import type { Post } from "@wanin/db";

interface Props {
  post: Post;
}

const PostItem: FC<Props> = ({ post }) => {
  return (
    <div className="w-full flex group duration-300 transition ease-in-out relative p-5">
      <span className="w-[230px] mr-10">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded">
          <Image
            src={"/error/error-memoji.png"}
            alt={post.title as string}
            className="object-cover rounded group-hover:scale-[1.05] duration-300 transition ease-in-out"
            loading="lazy"
            fill
            sizes="100vw"
            quality={100}
          />
        </div>
      </span>
      <div className="flex flex-col w-full">
        <h3 className="w-subtitle">{post.title}</h3>
        <p className="">{post.excerpt}</p>
      </div>
    </div>
  );
};

export default PostItem;
