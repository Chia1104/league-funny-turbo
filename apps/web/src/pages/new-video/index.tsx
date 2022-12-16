import { Head, NewVideo } from "@/components";
import { Page } from "@wanin/ui";

const NewVideoPage = () => {
  return (
    <Page className="w-main w-full">
      <Head />
      <article className="w-full flex flex-col items-center mt-28 px-5">
        <div className="w-full flex justify-center">
          <NewVideo />
        </div>
      </article>
    </Page>
  );
};

export default NewVideoPage;
