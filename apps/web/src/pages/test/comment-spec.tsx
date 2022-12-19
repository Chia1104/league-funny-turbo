import { NextPage } from "next";
import { NewComment } from "@/components/events";
import { Page } from "@wanin/ui";

const TestPage: NextPage = () => {
  return (
    <Page className="w-main">
      <h1>Comment box</h1>
      <NewComment />
    </Page>
  );
};

export default TestPage;
