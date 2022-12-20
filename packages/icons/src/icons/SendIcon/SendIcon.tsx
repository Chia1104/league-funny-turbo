import type { FC } from "react";
import cx from "classnames";
import { IconProps } from "../";
import { Size } from "@wanin/shared/types";

const SendIcon: FC<IconProps> = (props) => {
  const { className, strokeWidth = 1.5, size = Size.Base } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={cx(
        size === Size.Base && "w-6 h-6",
        size === Size.Small && "w-4 h-4",
        size === Size.Medium && "w-8 h-8",
        size === Size.Large && "w-10 h-10",
        size === Size.ExtraLarge && "w-14 h-14",
        className
      )}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
};

export default SendIcon;
