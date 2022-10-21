import ErrorPage from "next/error";
import type { NextPage } from "next";

const FeedNotFound: NextPage = () => {
  return <ErrorPage statusCode={404} title="Feed not found" />;
};

FeedNotFound.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default FeedNotFound;
