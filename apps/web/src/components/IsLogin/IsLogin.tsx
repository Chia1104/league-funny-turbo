import type { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { IS_PRODUCTION } from "@/shared/constants";

interface Props {
  fallBack?: ReactNode;
  children: ReactNode;
  debug?: {
    isLogin?: boolean;
    isAdmin?: boolean;
  };
}

const IsLogin: FC<Props> = (props) => {
  const {
    fallBack = null,
    children,
    debug = { isLogin: false, isAdmin: false },
  } = props;
  const { data: session } = useSession();

  if (!IS_PRODUCTION && debug?.isLogin) {
    return <>{children}</>;
  }

  if (!IS_PRODUCTION && debug?.isAdmin) {
    return <>{children}</>;
  }

  return <>{session ? children : fallBack}</>;
};

export default IsLogin;
