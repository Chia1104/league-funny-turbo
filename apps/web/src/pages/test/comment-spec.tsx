import { type NextPage } from "next";
import { NewComment } from "@/components/events";
import { Page } from "@wanin/ui";
import { IsLogin } from "@/components";
import { useSession } from "next-auth/react";

const TestPage: NextPage = () => {
  const { data: session } = useSession();
  return (
    <Page className="w-main">
      <h1>Comment box</h1>
      <IsLogin>
        <NewComment
          formProps={{
            onSubmit: (e) => {
              e.preventDefault();
              console.log(e.target);
            },
            className: "max-w-[600px]",
          }}
          userId={session?.user?.id?.toString()}
        />
      </IsLogin>
    </Page>
  );
};

export default TestPage;
