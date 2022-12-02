import React, {
  type FC,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import cx from "classnames";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

const Button: FC<Props> = (props) => {
  const { text, disabled, className, ...rest } = props;
  return (
    <button
      className={cx(
        "group relative inline-flex transition ease-in-out rounded self-center bg-secondary dark:bg-primary",
        className
      )}
      {...rest}>
      <span
        className={cx(
          "p-button-secondary transform text-base",
          disabled
            ? "text-gray-400 cursor-not-allowed"
            : "group-hover:-translate-x-1 group-hover:-translate-y-1"
        )}>
        {text}
      </span>
    </button>
  );
};

export default Button;
