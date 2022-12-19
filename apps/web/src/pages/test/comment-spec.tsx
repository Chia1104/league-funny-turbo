import { NextPage } from "next";
import { NewComment } from "@/components/events";
import { Page } from "@wanin/ui";

const TestPage: NextPage = () => {
  return (
    <Page className="w-main">
      <h1>Comment box</h1>
      <NewComment className="max-w-[640px] min-h-[150px] max-h-[150px]" />
    </Page>
  );
};

export default TestPage;
