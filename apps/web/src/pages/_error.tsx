import { Page } from "@wanin/ui";

const Error = ({ statusCode }: { statusCode: number }) => {
  return (
    <Page className="w-main">
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    </Page>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
