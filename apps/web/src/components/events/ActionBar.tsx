import { type FC, type DetailedHTMLProps, type HTMLAttributes } from "react";
import cx from "classnames";

const ActionBar: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <div
      className={cx(
        "flex items-center justify-center gap-3 w-bg-secondary shadow-lg rounded-full p-1 min-w-[100px]",
        className
      )}
      {...rest}>
      {children}
    </div>
  );
};

export default ActionBar;
