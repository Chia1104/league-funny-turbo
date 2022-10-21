import type { NextPage } from "next";
import { useRouter } from "next/router";

const LPFeed: NextPage = () => {
  const router = useRouter();
  const { fid } = router.query;

  return <div>{fid}</div>;
};

export default LPFeed;
