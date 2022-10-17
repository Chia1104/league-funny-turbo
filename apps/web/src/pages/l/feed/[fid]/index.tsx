import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getBaseUrl } from "@/utils/getBaseUrl";
import type { Feed } from "@wanin/types";
import { Page } from "@wanin/ui";
import { useRouter } from "next/router";

type FeedResult = {
  fid: number;
}[];

// export const getStaticPaths: GetStaticPaths = async () => {
//   const data = await fetch(`${getBaseUrl()}/api/feed/all-paths`);
//   const json = (await data.json()) as FeedResult;
//   const paths = json.map((feed) => ({
//     params: { fid: feed.fid.toString() },
//   }));
//
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };
//
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const data = await fetch(`${getBaseUrl()}/api/feed/${params?.fid}`);
//   const feed: Feed = await data.json();
//
//   return {
//     props: feed,
//     revalidate: 10 * 60,
//   };
// };

// const FeedDetail: NextPage<Feed> = (props) => {
//   return (
//     <Page className="w-main w-full">
//       <Head>
//         <title>League Funny Post</title>
//       </Head>
//       <article className="mt-28 w-full">
//         <h1>Feed SSG</h1>
//         <h2>{props.fid}</h2>
//         <p>{props.f_desc}</p>
//       </article>
//     </Page>
//   );
// };

const FeedDetail: NextPage = () => {
  const router = useRouter();
  return (
    <Page className="w-main w-full">
      <Head>
        <title>League Funny Post</title>
      </Head>
      <article className="mt-28 w-full">
        <h1>Feed SSG - (work in progress)</h1>
        <h2>{router.query.fid}</h2>
      </article>
    </Page>
  );
};

export default FeedDetail;