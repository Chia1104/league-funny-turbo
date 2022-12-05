import type { FC, ReactNode } from "react";
import { UserIntro, UserAbout } from "@/components";
import { Page } from "@wanin/ui";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const UserLayout: FC<Props> = (props) => {
  const router = useRouter();
  const { children } = props;
  return (
    <div className="w-container flex px-5">
      <UserIntro querykey={router.query.uid as string} />
      <div className="user-page">
        <UserAbout />
        <div className="w-full">
          <Page>{children}</Page>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
