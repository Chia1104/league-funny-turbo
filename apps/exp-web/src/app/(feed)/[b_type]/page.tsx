import type { Feed } from "@wanin/types";
import { serialize } from "@/utils/hydration.util";
import { FeedList } from "@/components/client";
import { fetchFeedList } from "@/helpers/api/server-only";

// export const generateStaticParams = async () => {
//   const data = await fetch(`${API_URL}/api/sidebar`, {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   const board = await data.json();
//   return board
//     .map((c: { contents: { b_type: string }[] }) => {
//       return c.contents.map((b: { b_type: string }) => ({
//         b_type: b.b_type,
//       }));
//     })
//     .flat();
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
