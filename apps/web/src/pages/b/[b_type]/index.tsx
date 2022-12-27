import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { type Feed, type Pagenate } from "@wanin/shared/types";
import { FeedList, Head } from "@/components";
import { Page } from "@wanin/ui";
import { fetchFeedList } from "@/helpers/api/routes/feed";
import { bTypePaths } from "@/server/ssg";
import { useIsMounted } from "usehooks-ts";
import { ApiResponseStatus } from "@wanin/shared/types";
import ssgConfig from "@/shared/config/ssg.config";

interface FeedProps {
  initFeed: Pagenate<Feed[]>;
}

export const getStaticPaths: () => Promise<{
  paths: { params: { b_type: string } }[];
  fallback: string;
}> = async () => {
  const paths = await bTypePaths();
  return {
    paths,
    fallback: ssgConfig["/b/[b_type]"]["fallback"],
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: initFeed, status } = await fetchFeedList({
    searchParams: {
      boardType: params?.b_type as string,
    },
  });

  if (status !== ApiResponseStatus.SUCCESS || initFeed?.data?.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initFeed: initFeed as Pagenate<Feed[]>,
    },
    revalidate: ssgConfig["/b/[b_type]"]["revalidate"],
  };
};

const BPage: NextPage<FeedProps> = (props) => {
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

export default BPage;
