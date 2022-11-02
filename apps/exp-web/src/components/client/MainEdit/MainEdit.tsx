"use client";

import { type FC } from "react";
import { EditIcon, FilmIcon } from "@wanin/ui";
import { Size } from "@wanin/types";
import { Popover } from "@geist-ui/core";
import cx from "classnames";
import Link from "next/link";

interface Props {
  className?: string;
}

const MainEdit: FC<Props> = (props) => {
  const { className } = props;
  const content = () => (
    <>
      <Popover.Item title>
        <span>文章</span>
      </Popover.Item>
      <Popover.Item>
        <Link href="#">
          <span className="flex gap-2">
            <EditIcon size={Size.Small} />
            發表文章
          </span>
        </Link>
      </Popover.Item>
      <Popover.Item>
        <span className="flex gap-2">
          <FilmIcon size={Size.Small} />
          張貼影片
        </span>
      </Popover.Item>
    </>
  );

  return (
    <div
      className={cx(
        "w-bg-secondary shadow-lg shadow-gray-200 dark:shadow-none dark:border dark:border-gray-700 rounded-full p-3 flex justify-center items-center z-40",
        className
      )}>
      <Popover
        content={content}
        placement="topEnd"
        offset={30}
        portalClassName="min-w-[130px]">
        <EditIcon size={Size.Base} />
      </Popover>
    </div>
  );
};

export default MainEdit;
