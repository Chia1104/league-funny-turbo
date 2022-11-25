import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { fetchFeedDetail } from "@/helpers/api/server-only";
import type { Feed } from "@wanin/types";
import { FeedDetail, Head } from "@/components";
import { Page } from "@wanin/ui";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data: initFeed, status } = await fetchFeedDetail(
    params?.bc_id as string
  );
  if (status !== 200)
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
    <Page className="w-main w-full">
      <Head />
      <article className="w-full flex flex-col pt-[110px]">
        <FeedDetail data={initFeed as Feed} />
      </article>
    </Page>
  );
};

export default LPFeed;
