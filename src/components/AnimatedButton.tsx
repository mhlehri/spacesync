import { motion } from "motion/react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AnimatedButton({ children, ...props }: ButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        {...props}
        className={cn("bg-indigo-500 hover:bg-indigo-600", props.className)}
      >
        {children}
      </Button>
    </motion.div>
  );
}
