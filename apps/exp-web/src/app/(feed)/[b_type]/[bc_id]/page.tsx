import { getBaseUrl } from "@/utils/get-base-url";
import { serialize } from "@/utils/hydration.util";
import { Feed } from "@wanin/types";
import { FeedDetail } from "@/components/client";
import { notFound } from "next/navigation";

const fetchInitFeed = async (bcId: string) => {
  const data = await fetch(`${getBaseUrl()}/api/feed/${bcId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const initFeed = (await data.json()) as Feed;

  return {
    status: data.status,
    initFeed,
  };
};

const BCPage = async ({ params }: { params: { bc_id: string } }) => {
  const { initFeed } = await fetchInitFeed(params.bc_id);
  if (!initFeed || !initFeed.fid) return notFound();
  return (
    <article className="mt-28 w-full w-bg-secondary rounded-lg p-7 flex flex-col overflow-hidden">
      <FeedDetail data={serialize(initFeed as Feed)} />
    </article>
  );
};

export default BCPage;
