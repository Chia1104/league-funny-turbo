import type { Feed } from "@wanin/types";
import { FeedList } from "@/components/client";
import { notFound } from "next/navigation";
import { fetchFeedList } from "@/helpers/api/server-only";

// export const generateStaticParams = async () => {
//   return await generateBTypePath();
// };

const BTPage = async ({ params }: { params: { b_type: string } }) => {
  const { data: initFeed } = await fetchFeedList(params.b_type);
  if (!initFeed || initFeed?.data?.length === 0) return notFound();
  return (
    <article className="w-full">
      <FeedList
        initFeed={initFeed?.data as Feed[]}
        searchParams={{
          boardType: params.b_type,
        }}
        queryKey={`${params.b_type}_feed_list`}
        experimental
      />
    </article>
  );
};

export default BTPage;
