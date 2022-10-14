import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Page } from "@wanin/ui";

// export const getServerSideProps: GetServerSideProps = async () => {
//   const posts = await getAllPosts();
//
//   return {
//     props: {
//       posts,
//     },
//   };
// };

const Feed: NextPage = () => {
  const router = useRouter();
  return (
    <Page className="w-main w-full">
      <Head>
        <title>League Funny Post</title>
      </Head>
      <article className="mt-28 w-full">
        <h1>Feed</h1>
      </article>
    </Page>
  );
};

export default Feed;
