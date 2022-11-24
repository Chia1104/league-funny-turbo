import { Button } from "@/lib/ui";
import type { Feed } from "@wanin/types";
import { FeedList } from "@/components/client";
import { fetchFeedList } from "@/helpers/api/server-only";
import Image from "next/image";

const UpsPage = async ({ params }: { params: { uid: string } }) => {
  const { data: initFeed } = await fetchFeedList();
  return (
    <>
      <div className="banner">
        <div className="user-bg">
          <div className="user-data">
            <Image
              className="data-img"
              alt="about/img1"
              src="/about/about_img1.png"
              width={100}
              height={100}
              objectFit="cover"
            />
            <div className="flex items-start mt-3">
              <h5 className="text-3xl font-medium text-white shadow">
                {"Vivian"}
              </h5>
              <span className="level shadow">Lv.1</span>
            </div>
            <p className="text-sm text-white mt-3 shadow">總貼文數</p>
            <p className="text-4xl text-white shadow">0</p>
          </div>
          <div className="btn-group">
            <div className="group">
              <button className="mx-3">個人主堡首頁</button>
              <button className="mx-3">發表文章</button>
              <button className="mx-3">按過的↑</button>
              <button className="mx-3">按過的↓</button>
              <button className="mx-3">留言</button>
              <button className="mx-3">收藏</button>
            </div>
          </div>
        </div>
      </div>

      <article className="mt-96 w-full">
        <FeedList
          initFeed={initFeed?.data as Feed[]}
          queryKey={`${params.uid}_up_feed_list`}
          experimental
        />
      </article>
    </>
  );
};

export default UpsPage;
