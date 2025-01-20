import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={cn("bg-indigo-500  hover:bg-indigo-600", props.className)}
    >
      {children}
    </Button>
  );
}
