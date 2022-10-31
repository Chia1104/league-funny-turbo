import { type FC, type ReactNode, useMemo } from "react";
import { PostLayout } from "@/components/Layout";
import { useRouter } from "next/router";
import Head, { HeadProps } from "./Head";
import { useQuery } from "@tanstack/react-query";
import type { PostCategory } from "@wanin/types";
import { getBaseUrl } from "@/utils/get-base-url";

interface Props {
  title: string;
  description: string;
  headContent?: HeadProps;
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { title, description, headContent, children } = props;
  const { pathname } = useRouter();
  const rootPath = useMemo(() => pathname.split("/")[1], [pathname]);
  const {
    data: categories,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<PostCategory[]>(["main-bord"], () => {
    return fetch(`${getBaseUrl()}/api/main-bord`).then((res) => res.json());
  });

  const getLayout = () => {
    switch (rootPath) {
      case "l":
        return (
          <PostLayout
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            categories={categories as PostCategory[]}>
            {children}
          </PostLayout>
        );
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
