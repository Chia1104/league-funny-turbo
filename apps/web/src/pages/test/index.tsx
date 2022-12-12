import { Page } from "@wanin/ui";
import { getBaseUrl } from "@/utils/get-base-url";
import { Head } from "@/components";

const TestPage = () => {
  return (
    <Page className="w-main w-full flex flex-col">
      <Head
        imageUrl={`${getBaseUrl()}/api/services/og?title=My%20custom%20title`}
      />
      <h1>Test Page</h1>
      <p>Test page content</p>
      <img
        src={`${getBaseUrl()}/api/services/og?title=TEST_TITLE`}
        alt="Vercel OGI"
      />
    </Page>
  );
};

export default TestPage;
