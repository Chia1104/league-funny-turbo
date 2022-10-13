import Head from "next/head";
import type { NextPage } from "next";
import { PostList } from "@/components";
import { trpcSSR } from "@/utils/trpc.util";

const Home: NextPage = () => {
  const { data } = trpcSSR.post.all.useQuery();

  return (
    <div className="w-main w-full">
      <Head>
        <title>League Funny Post</title>
      </Head>
      <article className="mt-28 w-full">
        <PostList posts={data} isLoading={!data} />
      </article>
    </div>
  );
};

export default Home;
