import type { ReactNode } from "react";
import { Page } from "@/lib/ui";

const EditorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-container flex px-5">
      <Page className="w-main w-full">{children}</Page>
    </div>
  );
};

export default EditorLayout;
