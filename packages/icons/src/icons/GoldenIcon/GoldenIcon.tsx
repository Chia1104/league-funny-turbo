import type { FC } from "react";
import cx from "classnames";
import { IconProps } from "../";
import { Size } from "@wanin/shared/types";

const GoldenIcon: FC<IconProps> = (props) => {
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
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  );
};

export default GoldenIcon;
