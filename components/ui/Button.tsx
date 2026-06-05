"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#1e3a5f] text-white hover:bg-[#152a45] active:scale-[0.98] shadow-sm hover:shadow-md":
              variant === "primary",
            "border-2 border-[#1e3a5f] text-[#1e3a5f] bg-transparent hover:bg-[#1e3a5f] hover:text-white":
              variant === "outline",
            "text-[#1e3a5f] bg-transparent hover:bg-[#1e3a5f]/10":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
