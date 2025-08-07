import { motion, AnimatePresence } from "framer-motion";

type SlideDoCentroProps = {
  show: boolean;
  duration?: number;
  direction: "left" | "right";
  children: React.ReactNode;
  delay?: number;
};

export default function SlideDoCentro({
  show,
  duration = 0.7,
  direction,
  children,
  delay = 0,
}: SlideDoCentroProps) {
  const xInitial = direction === "left" ? 60 : -60;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: xInitial, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: xInitial, scale: 0.95 }}
          transition={{
            duration,
            delay,
            ease: [0.45, 0, 0.55, 1],
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
