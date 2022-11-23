import { FroalaEditor } from "@/components/client";

const NewPostPage = () => {
  return (
    <article className="mt-28 w-full flex flex-col items-center">
      <div className="max-w-[1000px] w-full">
        <FroalaEditor />
      </div>
    </article>
  );
};

export default NewPostPage;
