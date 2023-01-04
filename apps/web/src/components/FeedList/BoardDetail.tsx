import { Image } from "@/components";
import type { Board } from "@wanin/shared/types";
import type { FC } from "react";
import { Tabs, Select } from "@geist-ui/core";
import { useRouter } from "next/router";

interface Props {
  boardDetail?: Board;
  isBoardLoading?: boolean;
  isFeedLoading?: boolean;
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

const sortTabs = [
  {
    id: 1,
    label: "熱門",
    value: "hot",
  },
  {
    id: 2,
    label: "最新",
    value: "new",
  },
  {
    id: 3,
    label: "含金文章",
    value: "golden",
  },
  {
    id: 4,
    label: "最多討論",
    value: "comment",
  },
  {
    id: 5,
    label: "最多按上",
    value: "mostup",
  },
  {
    id: 6,
    label: "最多按下",
    value: "mostdown",
  },
];

const BoardDetail: FC<Props> = ({
  boardDetail,
  isBoardLoading,
  isFeedLoading,
}) => {
  const router = useRouter();

  const BoardSort = () => (
    <div className="sticky top-[65px] pt-1 z-30 w-bg-secondary min-h-[58px] border-b dark:border-gray-700">
      <div className="flex items-center justify-start pl-5 min-h-[58px] w-full md:hidden">
        <Select
          value={router.query.sort as string}
          placeholder="排序"
          onChange={(value) => {
            router.push(
              {
                query: {
                  ...router.query,
                  sort: value,
                },
              },
              undefined,
              { shallow: true }
            );
          }}>
          {sortTabs.map((tab) => (
            <Select.Option key={tab.id} value={tab.value}>
              {tab.label}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="flex items-center justify-start pl-5 min-h-[58px] w-full hidden md:block">
        <Tabs
          onChange={(value) => {
            router.push(
              {
                query: {
                  ...router.query,
                  sort: value,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
          initialValue={(router.query.sort as string) ?? "hot"}
          hideDivider
          width="100%">
          {sortTabs.map((tab) => (
            <div key={tab.id}>
              <Tabs.Item
                label={tab.label}
                value={tab.value}
                disabled={isFeedLoading}
              />
            </div>
          ))}
        </Tabs>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col border-b dark:border-gray-700 min-h-[100px] relative rounded-t-lg overflow-hidden">
        {isBoardLoading ? (
          <span className="animate-pulse w-bg-secondary aspect-w-8 aspect-h-4 xl:aspect-h-2 w-full overflow-hidden" />
        ) : (
          <span className="aspect-w-8 aspect-h-4 xl:aspect-h-2 w-full overflow-hidden">
            <Image
              blur
              src={formatImageUrl(boardDetail?.b_cover ?? "")}
              alt={boardDetail?.b_en_name ?? ""}
              fill
              className="object-cover group-hover:scale-[1.05] duration-300 transition ease-in-out"
            />
          </span>
        )}
        <div className="absolute top-0 left-0 right-0 aspect-w-8 aspect-h-4 xl:aspect-h-2 w-full z-20 bg-gradient-to-t from-black to-transparent" />
        <span className="absolute bottom-5 left-10 z-30">
          <h2 className="text-3xl font-bold text-white">
            {boardDetail?.b_zh_name}
          </h2>
        </span>
      </div>
      <BoardSort />
    </>
  );
};

export default BoardDetail;
