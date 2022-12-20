import { type FC, type DetailedHTMLProps, type HTMLAttributes } from "react";
import cx from "classnames";
import { Loading } from "@geist-ui/core";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLoading?: boolean;
}

const ActionBar: FC<Props> = (props) => {
  const { className, children, isLoading, ...rest } = props;
  return (
    <div
      className={cx(
        "flex items-center justify-center gap-2 w-bg-secondary shadow-lg rounded-full p-1 px-2 min-w-[100px] min-h-[40px]",
        className
      )}
      {...rest}>
      {isLoading ? <Loading type="success" /> : children}
    </div>
  );
};

export default ActionBar;
