import type { NextPage } from "next";
import { useRouter } from "next/router";

const LCat: NextPage = () => {
  const router = useRouter();
  const { cat } = router.query;

  return <div>{cat}</div>;
};

export default LCat;
