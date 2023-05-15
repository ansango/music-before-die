import type { FC, PropsWithChildren } from "react";

import { motion } from "framer-motion";

export const DefaultMainTransition: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={className}
    >
      {children}
    </motion.main>
  );
};
