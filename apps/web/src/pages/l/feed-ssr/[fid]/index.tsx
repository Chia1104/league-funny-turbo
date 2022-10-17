import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import type { Feed } from "@wanin/types";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { Page } from "@wanin/ui";
import { useRouter } from "next/router";

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const data = await fetch(`${getBaseUrl()}/api/feed/${params?.fid}`);
//   const feed: Feed = await data.json();
//
//   return {
//     props: {
//       status: data.status,
//       data: feed,
//     },
//   };
// };
//
// interface Props {
//   status: number;
//   data: Feed;
// }

// const FeedDetailSSR: NextPage<Props> = ({ data, status }) => {
//   if (status !== 200) {
//     return (
//       <div className="w-main w-full">
//         <h1>404</h1>
//       </div>
//     );
//   }
//   return (
//     <Page className="w-main w-full">
//       <Head>
//         <title>League Funny Post</title>
//       </Head>
//       <article className="mt-28 w-full">
//         <h1>Feed SSR</h1>
//         <h2>{data.fid}</h2>
//         <p>{data.f_desc}</p>
//       </article>
//     </Page>
//   );
// };

const FeedDetailSSR: NextPage = () => {
    const router = useRouter();
    return (
        <Page className="w-main w-full">
            <Head>
                <title>League Funny Post</title>
            </Head>
            <article className="mt-28 w-full">
                <h1>Feed SSR - (work in progress)</h1>
                <h2>{router.query.fid}</h2>
            </article>
        </Page>
    );
};

export default FeedDetailSSR;
