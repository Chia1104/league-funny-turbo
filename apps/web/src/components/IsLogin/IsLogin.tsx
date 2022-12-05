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
  useAdmin?: boolean;
  adminFallBack?: ReactNode;
}

const IsLogin: FC<Props> = (props) => {
  const {
    fallBack = null,
    children,
    useAdmin = false,
    adminFallBack = null,
    debug = { isLogin: false, isAdmin: false },
  } = props;
  const { data: session } = useSession();

  if (!IS_PRODUCTION) {
    if (debug.isAdmin || debug.isLogin) {
      return <>{children}</>;
    }
    if (!debug.isAdmin) {
      return <>{adminFallBack}</>;
    }
    if (!debug.isLogin) {
      return <>{fallBack}</>;
    }
  }

  if (useAdmin) {
    return <>{session?.user.admin_id ? children : adminFallBack ?? fallBack}</>;
  }

  return <>{session ? children : fallBack}</>;
};

export default IsLogin;
