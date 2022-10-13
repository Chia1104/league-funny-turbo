import type { FC, ReactNode } from "react";
import { PostLayout } from "@/components/Layout";
import { useRouter } from "next/router";
import Head, { HeadProps } from "./Head";

interface Props {
  title: string;
  description: string;
  headContent?: HeadProps;
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { title, description, headContent, children } = props;
  const { pathname } = useRouter();
  const rootPath = pathname.split("/")[1];

  const getLayout = () => {
    switch (rootPath) {
      case "l":
        return <PostLayout>{children}</PostLayout>;
      default:
        return <>{children}</>;
    }
  };

  return (
    <>
      <Head title={title} description={description} {...headContent} />
      {getLayout()}
    </>
  );
};

export default Layout;
