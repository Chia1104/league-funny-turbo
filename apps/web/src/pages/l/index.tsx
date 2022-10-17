import Head from "next/head";
import type { NextPage } from "next";
import { Button, Page } from "@wanin/ui";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Page className="w-main w-full">
      <Head>
        <title>League Funny Post</title>
      </Head>
      <article className="mt-28 w-full">
        <Button
          text="SSG"
          onClick={() => router.push("/l/feed/1")}
          className="mx-5"
        />
        <Button
          text="SSR"
          onClick={() => router.push("/l/feed-ssr/1")}
          className="mx-5"
        />
      </article>
    </Page>
  );
};

export default Home;
