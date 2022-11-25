import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import type { Feed, Pagenate } from "@wanin/types";
import { FeedList, Head } from "@/components";
import { Page } from "@wanin/ui";
import { fetchFeedList } from "@/helpers/api/server-only";
import { useUpdateEffect } from "usehooks-ts";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data: initFeed, status } = await fetchFeedList(
    params?.b_type as string
  );
  if (!initFeed || initFeed?.data?.length === 0 || status !== 200)
    return {
      notFound: true,
    };

  return {
    props: {
      status,
      initFeed,
    },
  };
};

/**
 * 🔖 Issue #14
 * [Issue] (https://github.com/league-funny/frontend-nextjs/issues/14)
 *
 * 🔖 Feature #16 (Been solved in `exp-web`)
 * [Feature] (https://github.com/league-funny/frontend-nextjs/issues/16)
 */
const LCat: NextPage<FeedProps> = (props) => {
  const router = useRouter();
  const { b_type } = router.query;
  const { initFeed } = props;
  useUpdateEffect(() => {
    if (!b_type) return;
    router.push(`/l/${b_type}`);
    return () => {
      initFeed.data = [];
    };
  }, [b_type]);

  return (
    <Page className="w-main w-full">
      <Head />
      <article className="mt-28 w-full">
        <FeedList
          initFeed={initFeed?.data as Feed[]}
          experimental
          searchParams={{
            boardType: b_type as string,
          }}
          queryKey={`${b_type}_feed_list`}
        />
      </article>
    </Page>
  );
};

export default LCat;
