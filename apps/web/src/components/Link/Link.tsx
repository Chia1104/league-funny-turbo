import { type FC, type ReactNode } from "react";
import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";

interface Props extends NextLinkProps {
  children: ReactNode;
}

const Link: FC<Props> = (props) => {
  const { children, ...rest } = props;
  return (
    <NextLink passHref scroll prefetch={false} {...rest}>
      {children}
    </NextLink>
  );
};

export default Link;
