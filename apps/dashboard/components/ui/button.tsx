"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "chrome-sweep bg-gradient-to-r from-pulse-violet to-pulse-purple text-navy-950 shadow-[0_0_0_1px_rgba(212,175,55,0.5),0_18px_40px_-12px_rgba(212,175,55,0.55)] hover:shadow-[0_0_0_1px_rgba(212,175,55,0.7),0_22px_50px_-10px_rgba(212,175,55,0.75)] hover:brightness-110 active:brightness-95",
  secondary:
    "bg-navy-800 text-ink-100 border border-white/10 hover:bg-navy-700 hover:border-white/20",
  outline:
    "bg-transparent text-ink-100 border border-pulse-violet/50 hover:border-pulse-violet hover:bg-pulse-violet/10",
  ghost:
    "bg-transparent text-ink-300 hover:text-ink-100 hover:bg-white/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-3.5 py-2 gap-1.5 rounded-lg",
  md: "text-sm px-5 py-2.5 gap-2 rounded-xl",
  lg: "text-base px-7 py-3.5 gap-2.5 rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "focus-ring inline-flex items-center justify-center font-medium font-body transition-all duration-200 ease-out disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
