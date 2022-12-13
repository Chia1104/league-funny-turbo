import { useS3ImageUpload } from "@/hooks";
import { Page } from "@wanin/ui";
import { getBaseUrl } from "@/utils/get-base-url";
import { useRef } from "react";
import { type GetServerSideProps, type NextPage } from "next";
import { encodeString } from "@wanin/shared/utils";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { title } = query;
  return {
    props: {
      title: title ? encodeString(title as string) : "",
    },
  };
};

interface TestPageProps {
  title: string;
}

const TestPage: NextPage<TestPageProps> = ({ title }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { CanvasPreview } = useS3ImageUpload({
    resize: {
      width: 1200,
      height: 630,
      imgRef,
      runtimes: "canvas",
    },
  });
  return (
    <Page className="w-main">
      <h1>Test Page</h1>
      <img
        className="hidden"
        ref={imgRef}
        src={`${getBaseUrl()}/api/services/og?title=${title || "Test"}`}
        alt="og image"
      />
      <CanvasPreview />
    </Page>
  );
};

export default TestPage;
