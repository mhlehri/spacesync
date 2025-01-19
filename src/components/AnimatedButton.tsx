import { motion } from "motion/react";
import { Button, ButtonProps } from "@/components/ui/button";

export function AnimatedButton({ children, ...props }: ButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
