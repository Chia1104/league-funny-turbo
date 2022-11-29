import type { ReactNode } from "react";
import { Page } from "@/lib/ui";
import { UserIntro, UserAbout } from "@/components/client";

const UserLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { uid: string };
}) => {
  return (
    <div className="w-container flex px-5">
      <UserIntro querykey={params.uid} />
      <div className="user-page w-full">
        <UserAbout />
        <div className="w-full">
          <Page>{children}</Page>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
