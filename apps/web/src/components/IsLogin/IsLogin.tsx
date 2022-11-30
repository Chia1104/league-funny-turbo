import type { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { IS_PRODUCTION } from "@/shared/constants";

interface Props {
  fallBack?: ReactNode;
  children: ReactNode;
  isLogin?: boolean;
}

const IsLogin: FC<Props> = (props) => {
  const { fallBack = null, children, isLogin } = props;
  const { data: session } = useSession();

  if (!IS_PRODUCTION && isLogin) {
    return <>{children}</>;
  }

  return <>{session ? children : fallBack}</>;
};

export default IsLogin;
