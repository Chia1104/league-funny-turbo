import { type FC, type ReactNode, useMemo } from "react";
import { PostLayout } from "@/components/Layout";
import { useRouter } from "next/router";
import { Footer, MainEdit, MainNav, IsLogin } from "@/components";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;
  const { pathname } = useRouter();
  const rootPath = useMemo(() => pathname.split("/")[1], [pathname]);

  const getLayout = () => {
    switch (rootPath) {
      case "b":
        return <PostLayout>{children}</PostLayout>;
      default:
        return <>{children}</>;
    }
  };

  return (
    <>
      <MainNav />
      <IsLogin>
        <MainEdit className="fixed bottom-0 right-0 mr-5 mb-5 md:mr-10 md:mb-10" />
      </IsLogin>
      {getLayout()}
      <Footer />
    </>
  );
};

export default Layout;
