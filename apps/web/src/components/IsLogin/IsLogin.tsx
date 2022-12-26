import type { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { IS_PRODUCTION } from "@/shared/constants";
import { type Session } from "next-auth";

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
  loadingFallBack?: ReactNode;
  customRule?: (session: Session | null) => boolean;
}

const IsLogin: FC<Props> = (props) => {
  const {
    fallBack = null,
    children,
    useAdmin = false,
    adminFallBack = null,
    debug,
    loadingFallBack = null,
    customRule,
  } = props;
  const { data: session, status } = useSession();

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

  if (customRule) {
    if (customRule(session)) {
      return <>{children}</>;
    }
    return <>{fallBack}</>;
  }

  if (useAdmin) {
    return (
      <>
        {session?.user?.admin_id === 1 ? children : adminFallBack ?? fallBack}
      </>
    );
  }

  if (status === "loading") {
    return <>{loadingFallBack}</>;
  }
  if (status === "unauthenticated") {
    return <>{fallBack}</>;
  }
  return <>{children}</>;
};

export default IsLogin;
