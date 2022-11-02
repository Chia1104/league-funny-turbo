"use client";

import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";

const Banner: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  const { children, ...rest } = props;
  return (
    <div
      className="min-w-[300px] h-screen hidden lg:flex lg:flex-col ml-10 pt-[70px]"
      {...rest}>
      <div className="my-10 w-bg-secondary h-full my-10 rounded-lg p-5 flex flex-col gap-1 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Banner;
