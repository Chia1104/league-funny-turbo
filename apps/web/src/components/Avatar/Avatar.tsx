import type { FC } from "react";
import { Image } from "@/components";
import Link from "next/link";

interface Props {
  username: string;
  userId?: string | number;
  url?: string;
  ratio: number;
  onClick?: () => void;
}

const Avatar: FC<Props> = (props) => {
  const { username, userId, url, ratio, onClick } = props;

  return (
    <span className="relative">
      <Image
        onClick={onClick}
        src={url || "/error/error-memoji.png"}
        width={ratio}
        height={ratio}
        className="rounded-full"
        alt={username}
      />
      {userId && (
        <Link
          href={`/user/${userId}`}
          prefetch={false}
          className="absolute top-0 bottom-0 right-0 left-0"
        />
      )}
    </span>
  );
};

export default Avatar;
