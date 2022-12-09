import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import type { Feed, Pagenate } from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { Page } from "@wanin/ui";
import { fetchFeedList } from "@/helpers/api/server-only";
import { useIsMounted } from "usehooks-ts";
import { useState } from "react";

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

const LCat: NextPage<FeedProps> = (props) => {
  const router = useRouter();
  const { b_type } = router.query;
  const { initFeed } = props;
  const [isClient, setIsClient] = useState(false);
  const isMounted = useIsMounted();

  return (
    <Page className="w-main w-full justify-start">
      <Head />
      <article className="mt-28 w-full">
        {!isMounted() ? (
          <FeedList
            initFeed={initFeed?.data as Feed[]}
            experimental
            searchParams={{
              boardType: b_type as string,
            }}
            queryKey={`${b_type}_feed_list`}
          />
        ) : (
          <FeedList
            experimental
            searchParams={{
              boardType: b_type as string,
            }}
            initPage={1}
            queryKey={`${b_type}_feed_list`}
          />
        )}
      </article>
    </Page>
  );
};

export default LCat;
