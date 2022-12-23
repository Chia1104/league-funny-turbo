import type { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { IS_PRODUCTION } from "@/shared/constants";

interface Props {
  fallBack?: ReactNode;
  children: ReactNode;
  debug?: {
    useAuth?: {
      isAuth: boolean;
    };
    useAdmin?: {
      isAdmin: boolean;
    };
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
    debug,
  } = props;
  const { data: session } = useSession();

  if (!IS_PRODUCTION && debug) {
    if (debug.useAuth) {
      if (debug.useAuth.isAuth) {
        return <>{children}</>;
      }
      return <>{fallBack}</>;
    }
    if (debug.useAdmin) {
      if (debug.useAdmin.isAdmin) {
        return <>{children}</>;
      }
      return <>{adminFallBack}</>;
    }
  }

  if (useAdmin) {
    return (
      <>{session?.user.admin_id === 1 ? children : adminFallBack ?? fallBack}</>
    );
  }

  return <>{session ? children : fallBack}</>;
};

export default IsLogin;
