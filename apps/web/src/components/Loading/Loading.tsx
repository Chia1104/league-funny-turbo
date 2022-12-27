import type { FC, ReactNode } from "react";
import { Loading as GLoading, type LoadingProps } from "@geist-ui/core";

interface Props {
  isLoading?: boolean;
  fallback?: ReactNode;
  children?: ReactNode;
  geistLoadingProps?: LoadingProps;
}

const Loading: FC<Props> = (props) => {
  const { isLoading = false, fallback, children, geistLoadingProps } = props;
  return (
    <div className="relative w-full h-full">
      {isLoading ? (
        fallback ? (
          fallback
        ) : (
          <div className="w-bg-secondary w-full h-full absolute flex justify-center items-center z-40 top-0 left-0 right-0">
            <GLoading {...geistLoadingProps} />
          </div>
        )
      ) : null}
      {children}
    </div>
  );
};

export default Loading;
