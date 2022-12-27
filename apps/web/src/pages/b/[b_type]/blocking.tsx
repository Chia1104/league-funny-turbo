import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import {
  ApiResponseStatus,
  type Feed,
  type Pagenate,
} from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { Page } from "@wanin/ui";
import { fetchFeedList } from "@/helpers/api/routes/feed";
import { bTypePaths } from "@/server/ssg";
import { useIsMounted } from "usehooks-ts";
import Error from "next/error";

interface FeedProps {
  status: ApiResponseStatus;
  initFeed: Pagenate<Feed[]>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await bTypePaths();
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: initFeed, status } = await fetchFeedList({
    searchParams: {
      boardType: params?.b_type as string,
    },
  });

  return {
    props: {
      status,
      initFeed: initFeed as Pagenate<Feed[]>,
    },
    revalidate: 60,
  };
};

const LCatSSG: NextPage<FeedProps> = (props) => {
  const router = useRouter();
  const { b_type } = router.query;
  const { initFeed, status } = props;
  const isMounted = useIsMounted();

  if (status !== "success" || initFeed.data?.length === 0) {
    return <Error statusCode={404} />;
  }

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

export default LCatSSG;
