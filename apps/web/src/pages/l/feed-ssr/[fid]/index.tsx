import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import type { Feed } from "@wanin/types";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { Page } from "@wanin/ui";
import { Avatar } from "@/components";
import dynamic from "next/dynamic";

const FeedWithHTML = dynamic(
  () => import("../../../../components/FeedWithHTML")
);
const Youtube = dynamic(() => import("../../../../components/Youtube"));
const TwitchClip = dynamic(() => import("../../../../components/TwitchClip"));
const PlayList = dynamic(() => import("../../../../components/PlayList"));

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
      <article className="mt-28 w-full w-bg-secondary rounded-lg p-7 flex flex-col">
        <h1 className="mb-7">{data.f_desc}</h1>
        <div className="mb-10 flex items-center">
          <Avatar username={data.f_author_name} ratio={50} />
          <h2 className="ml-3 text-base">{data.f_author_name}</h2>
        </div>
        {data.f_type === "html" && (
          <FeedWithHTML htmlSource={data.f_attachment} />
        )}
        {data.f_type === "youtube" && (
          <>
            {JSON.parse(data.f_attachment).map((item: any) => (
              <Youtube
                key={item.object_id}
                objectID={item.object_id}
                ytTitle={data.f_desc}
              />
            ))}
          </>
        )}
        {data.f_type === "twitch_clip" && (
          <>
            {JSON.parse(data.f_attachment).map((item: any) => (
              <TwitchClip key={item.video_url} objectId={item.object_id} />
            ))}
          </>
        )}
        {data.f_type === "playlist" && (
          <PlayList attachment={data.f_attachment} />
        )}
        {data.f_type === "article" && <>{data.f_attachment}</>}
      </article>
    </Page>
  );
};

export default FeedDetailSSR;
