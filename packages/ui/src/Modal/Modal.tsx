import { memo } from "react";
import type { FC, ReactNode } from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { useLockedBody } from "usehooks-ts";

interface ModalProps extends MotionProps {
  isOpen: boolean;
  children?: ReactNode;
  activityModal: () => void;
  className?: string;
}

const Modal: FC<ModalProps> = (props) => {
  const { isOpen, children, activityModal, className, ...rest } = props;
  const ov = {
    open: { opacity: 1 },
    closed: { opacity: 0, delay: 300 },
  };
  const iv = {
    open: { opacity: 1, y: 0, delay: 3000 },
    closed: { opacity: 0, y: -100 },
  };
  useLockedBody(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={activityModal}
          initial={"closed"}
          animate={isOpen ? "open" : "closed"}
          exit={"closed"}
          variants={ov}
          className="modal">
          <motion.div
            initial={"closed"}
            animate={isOpen ? "open" : "closed"}
            exit={"closed"}
            variants={iv}
            className={className}
            {...rest}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Modal, (prev, next) => prev.isOpen === next.isOpen);
