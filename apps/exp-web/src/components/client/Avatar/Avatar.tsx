"use client";

import type { FC } from "react";
import { Image } from "@/components/client";
import Link from "next/link";

interface Props {
  username: string;
  userId?: string | number;
  url: string;
  ratio: number;
}

const Avatar: FC<Props> = (props) => {
  const { username, userId, url, ratio } = props;

  return (
    <span className="relative">
      <Image
        src={url || "/error/error-memoji.png"}
        width={ratio}
        height={ratio}
        className="rounded-full"
        alt={username}
      />
      {userId && (
        <Link
          scroll
          href={`/user/${userId}`}
          prefetch={false}
          className="absolute top-0 bottom-0 right-0 left-0"
        />
      )}
    </span>
  );
};

export default Avatar;
