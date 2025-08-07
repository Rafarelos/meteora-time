import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

type FadeInOutProps = {
  show: boolean;
  children: ReactNode;
  duration?: number;
  scale?: number;
  className?: string;
};

export default function FadeInOut({
  show,
  children,
  duration = 0.45,
  scale = 0.9,
  className = "",
}: FadeInOutProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale }}
          transition={{ duration }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
