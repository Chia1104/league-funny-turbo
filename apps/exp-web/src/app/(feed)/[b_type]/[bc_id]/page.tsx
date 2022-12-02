import type { Feed } from "@wanin/shared/types";
import { FeedDetail } from "@/components/server";
import { notFound } from "next/navigation";
import { fetchFeedDetail } from "@/helpers/api/server-only";

// export const generateStaticParams = async ({ b_type }: { b_type: string }) => {
//   return await generateBcIdPath(b_type);
// };

const BCPage = async ({ params }: { params: { bc_id: string } }) => {
  const { data: initFeed, status } = await fetchFeedDetail(params.bc_id);
  if (status !== 200) notFound();
  return (
    <article className="w-full flex flex-col pt-[110px]">
      <FeedDetail data={initFeed as Feed} />
    </article>
  );
};

export default BCPage;
