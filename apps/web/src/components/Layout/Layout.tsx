import { type FC, type ReactNode, useMemo } from "react";
import { PostLayout } from "@/components/Layout";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;
  const { pathname } = useRouter();
  const rootPath = useMemo(() => pathname.split("/")[1], [pathname]);

  const getLayout = () => {
    switch (rootPath) {
      case "l":
        return <PostLayout>{children}</PostLayout>;
      default:
        return <>{children}</>;
    }
  };

  return <>{getLayout()}</>;
};

export default Layout;
