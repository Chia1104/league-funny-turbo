import { Head } from "@/components";
import { NewPost } from "@/components/events";
import { Page } from "@wanin/ui";

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
