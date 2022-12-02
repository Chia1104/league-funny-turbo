import type { FC, ReactNode } from "react";
import { UserIntro, UserAbout } from "@/components";
import { Page } from "@wanin/ui";

interface Props {
  children: ReactNode;
}

const UserLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="w-container flex px-5">
      <UserIntro querykey={"1"} />
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
