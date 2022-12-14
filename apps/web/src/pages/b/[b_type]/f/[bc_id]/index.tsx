import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { fetchFeedDetail } from "@/helpers/api/routes/feed";
import type { Feed } from "@wanin/shared/types";
import { FeedDetail, Head } from "@/components";
import { Page } from "@wanin/ui";
import { ApiResponseStatus } from "@wanin/shared/types";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const {
    data: initFeed,
    status,
    statusCode,
  } = await fetchFeedDetail(params?.bc_id as string);
  if (status !== ApiResponseStatus.SUCCESS || statusCode !== 200)
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

interface FeedProps {
  status: number;
  initFeed: Feed;
}

const LPFeed: NextPage<FeedProps> = (props) => {
  const { initFeed } = props;
  return (
    <Page className="w-main w-full justify-start">
      <Head />
      <article className="w-full flex flex-col pt-[110px]">
        <FeedDetail data={initFeed} />
      </article>
    </Page>
  );
};

export default LPFeed;
