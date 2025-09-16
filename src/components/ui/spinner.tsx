'use client';

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("animate-spin rounded-full border-solid", {
  variants: {
    size: {
      small: "h-4 w-4 border-2",
      medium: "h-8 w-8 border-4",
      large: "h-12 w-12 border-8",
    },
    color: {
      primary: "border-t-primary border-l-primary border-r-primary/30 border-b-primary/30",
      white: "border-t-white border-l-white border-r-white/30 border-b-white/30",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function Spinner({ size, color, className }: SpinnerProps) {
  return <div className={cn(spinnerVariants({ size, color, className }))} />;
}
