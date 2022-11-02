import type { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return <div className="w-container flex px-5">{children}</div>;
};

export default UserLayout;
