import type { Feed } from "@wanin/types";
import { serialize } from "@/utils/hydration.util";
import { FeedList } from "@/components/client";
import { fetchFeedList, generateBTypePath } from "@/helpers/api/server-only";

// export const generateStaticParams = async () => {
//   return await generateBTypePath();
// };

const BTPage = async ({ params }: { params: { b_type: string } }) => {
  const { data: initFeed } = await fetchFeedList(params.b_type);
  return (
    <article className="mt-28 w-full">
      <FeedList
        initFeed={serialize(initFeed?.data as Feed[])}
        experimental
        searchParams={{
          boardType: params.b_type,
        }}
      />
    </article>
  );
};

export default BTPage;
