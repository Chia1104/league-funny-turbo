import type { Feed } from "@wanin/types";
import { FeedDetail } from "@/components/server";
import { notFound } from "next/navigation";
import { fetchFeedDetail, generateBcIdPath } from "@/helpers/api/server-only";

// export const generateStaticParams = async ({ b_type }: { b_type: string }) => {
//   return await generateBcIdPath(b_type);
// };

const BCPage = async ({ params }: { params: { bc_id: string } }) => {
  const { data: initFeed } = await fetchFeedDetail(params.bc_id);
  if (!initFeed || !initFeed.fid) return notFound();
  return (
    <article className="mt-28 w-full w-bg-secondary rounded-lg p-7 flex flex-col overflow-hidden">
      <FeedDetail data={initFeed as Feed} />
    </article>
  );
};

export default BCPage;
