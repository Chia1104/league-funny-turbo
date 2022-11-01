"use client";

import type { FC } from "react";
import { Image } from "@/components/client";

interface Props {
  username: string;
  url?: string;
  ratio: number;
}

const Avatar: FC<Props> = (props) => {
  const { username, url, ratio } = props;

  return (
    <Image
      src={url || "/error/error-memoji.png"}
      width={ratio}
      height={ratio}
      className="rounded-full"
      alt={username}
    />
  );
};

export default Avatar;
