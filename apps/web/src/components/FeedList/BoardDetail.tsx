import { Image } from "@/components";
import type { Board } from "@wanin/shared/types";
import type { FC } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/hooks";

interface Props {
  boardDetail: Board;
}

const formatImageUrl = (url: string) => {
  if (!url) {
    return "";
  }
  if (url?.startsWith("http" || "https")) {
    return url;
  }

  return `https:${url}`;
};

const BoardDetail: FC<Props> = ({ boardDetail }) => {
  const isMounted = useIsMounted();

  const BoardSort = () =>
    isMounted
      ? createPortal(
          <p>SORT</p>,
          document.querySelector("#__board_sort__") as HTMLDivElement
        )
      : null;

  return (
    <>
      <div className="flex flex-col border-b dark:border-gray-700 min-h-[100px] relative rounded-t-lg overflow-hidden">
        <span className="aspect-w-8 aspect-h-4 xl:aspect-h-2 w-full overflow-hidden">
          <Image
            blur
            src={formatImageUrl(boardDetail.b_cover)}
            alt={boardDetail.b_en_name}
            fill
            className="object-cover group-hover:scale-[1.05] duration-300 transition ease-in-out"
          />
        </span>
        <div className="absolute top-0 left-0 right-0 aspect-w-8 aspect-h-4 xl:aspect-h-2 w-full z-20 bg-gradient-to-t from-black to-transparent" />
        <span className="absolute bottom-5 left-10 z-30">
          <h2 className="text-3xl font-bold text-white">
            {boardDetail.b_zh_name}
          </h2>
        </span>
      </div>
      <BoardSort />
    </>
  );
};

export default BoardDetail;
