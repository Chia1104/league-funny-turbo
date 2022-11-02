import type { ReactNode } from "react";
import { Footer } from "@/components/template";

const RootTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default RootTemplate;
