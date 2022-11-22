import { type FC, type ReactNode } from "react";
import * as RDTooltip from "@radix-ui/react-tooltip";
import cx from "classnames";

interface Props {
  content: ReactNode;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
  sideOffset?: number;
}

const Tooltip: FC<Props> = (props) => {
  const { content, children, arrow = true, className, sideOffset = 5 } = props;

  return (
    <RDTooltip.Provider delayDuration={0} skipDelayDuration={0}>
      <RDTooltip.Root>
        <RDTooltip.Trigger asChild>
          <button>{children}</button>
        </RDTooltip.Trigger>
        <RDTooltip.Portal>
          <RDTooltip.Content
            className={cx(
              "p-bg-primary shadow-lg shadow-gray-200 dark:shadow-none dark:border dark:border-gray-700 z-50 min-w-[50px] p-2 rounded-lg",
              className
            )}
            sideOffset={sideOffset}>
            {content}
            {arrow && (
              <RDTooltip.Arrow className="fill-light dark:fill-black" />
            )}
          </RDTooltip.Content>
        </RDTooltip.Portal>
      </RDTooltip.Root>
    </RDTooltip.Provider>
  );
};

export default Tooltip;
