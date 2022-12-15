import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import {
  type Feed,
  type Pagenate,
  ApiResponseStatus,
} from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { Page } from "@wanin/ui";
import { fetchFeedList } from "@/helpers/api/routes/feed";
import { useIsMounted } from "usehooks-ts";

interface FeedProps {
  status: number;
  initFeed: Pagenate<Feed[]>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const {
    data: initFeed,
    status,
    statusCode,
  } = await fetchFeedList({
    searchParams: {
      boardType: params?.b_type as string,
    },
  });
  if (status !== ApiResponseStatus.SUCCESS || statusCode !== 200)
    return {
      notFound: true,
    };

  return {
    props: {
      status,
      initFeed: initFeed as Pagenate<Feed[]>,
    },
  };
};

const LCat: NextPage<FeedProps> = (props) => {
  const router = useRouter();
  const { b_type } = router.query;
  const { initFeed } = props;
  const isMounted = useIsMounted();

  return (
    <Page className="w-main w-full justify-start">
      <Head />
      <article className="mt-28 w-full">
        {!isMounted() ? (
          <FeedList
            initFeed={initFeed.data}
            searchParams={{
              boardType: b_type as string,
            }}
            queryKey={`${b_type}_feed_list`}
          />
        ) : (
          <FeedList
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
