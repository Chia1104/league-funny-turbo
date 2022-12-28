import React, { type FC, type ReactNode } from "react";

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <div id="__wanin_modal_portal" />
    </>
  );
};

export default Provider;
