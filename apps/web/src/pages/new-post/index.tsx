import { Head, NewPost } from "@/components";
import { Page } from "@wanin/ui";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "@/utils/get-server-auth-session";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/b",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const NewPostPage = () => {
  return (
    <Page className="w-main w-full">
      <Head />
      <article className="w-full flex flex-col items-center mt-28 px-5">
        <div className="w-full flex justify-center">
          <NewPost />
        </div>
      </article>
    </Page>
  );
};

export default NewPostPage;
