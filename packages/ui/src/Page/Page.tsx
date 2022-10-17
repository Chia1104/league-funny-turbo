import type { FC } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

const Page: FC<HTMLMotionProps<"main">> = (props) => {
  const { children, ...rest } = props;
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...rest}>
      {children}
    </motion.main>
  );
};

export default Page;
