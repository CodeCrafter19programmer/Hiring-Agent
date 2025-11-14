"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", isLoading, children, disabled, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-button font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none backdrop-blur-md focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30 focus:ring-offset-2";

    const variants: Record<Variant, string> = {
      primary:
        "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-sm",
      secondary:
        "border border-white/20 bg-white/60 text-foreground hover:bg-white/80 dark:bg-white/10 dark:text-foreground",
      danger: "bg-red-600 text-white hover:bg-red-700",
      ghost: "hover:bg-black/5 dark:hover:bg-white/10",
    };

    const sizes: Record<Size, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant as Variant], sizes[size as Size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <span className="mr-2">⏳</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

