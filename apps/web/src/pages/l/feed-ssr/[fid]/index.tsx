import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import type { Feed } from "@wanin/types";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { Page } from "@wanin/ui";
import Script from "next/script";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await fetch(`${getBaseUrl()}/api/feed/${params?.fid}`);
  const feed: Feed = await data.json();

  if (data.status !== 200) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: feed,
    },
  };
};

interface Props {
  data: Feed;
}

const FeedDetailSSR: NextPage<Props> = ({ data }) => {
  return (
    <Page className="w-main w-full">
      <Head>
        <title>League Funny Post</title>
      </Head>
      <article className="mt-28 w-full">
        <h1>Feed SSR</h1>
        <h2>{data.fid}</h2>
        <p>{data.f_desc}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: data.f_attachment,
          }}
        />
      </article>
      <Script async src="//cdn.embedly.com/widgets/platform.js" />
    </Page>
  );
};

export default FeedDetailSSR;
