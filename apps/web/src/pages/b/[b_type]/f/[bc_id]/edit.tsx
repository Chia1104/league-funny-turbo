import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { getTokenRaw } from "@/server/auth/services";
import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { fetchFeedDetail } from "@/helpers/api/routes/feed";
import { type Feed } from "@wanin/shared/types";
import { Page } from "@wanin/ui";
import { Head } from "@/components";

const UpdatePost = dynamic(() => import("@/components/events/UpdatePost"), {
  ssr: false,
});

interface Props {
  raw: string;
  initFeed: Feed;
}

export const getServerSideProps: (
  ctx: any
) => Promise<
  | { props: { initFeed: Feed | undefined; raw: string } }
  | { redirect: { permanent: boolean; destination: string } }
  | { redirect: { destination: string } }
> = async (ctx) => {
  const raw = await getTokenRaw(ctx["req"]);
  const session = await getServerAuthSession(ctx);
  const feed = await fetchFeedDetail(ctx.params?.bc_id as string);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (
    parseInt(session.user.id) === feed.data?.f_uid ||
    session.user.admin_id > 0
  ) {
    return {
      props: {
        raw,
        initFeed: feed.data,
      },
    };
  }

  return {
    redirect: {
      destination: `/b/${ctx.params?.b_type}/f/${ctx.params?.bc_id}`,
    },
  };
};

const FeedEditPage: NextPage<Props> = ({ raw, initFeed }) => {
  return (
    <Page className="w-main w-full">
      <Head />
      <article className="w-full flex flex-col items-center mt-28 px-5">
        <div className="w-full flex justify-center">
          {initFeed.f_type === "html" && (
            <UpdatePost initFeed={initFeed} raw={raw} />
          )}
        </div>
      </article>
    </Page>
  );
};

export default FeedEditPage;
