"use client";

import { useApplyModal } from "@/context/ApplyModalContext";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ApplyButtonProps {
  courseName?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  fullWidth?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
}

export default function ApplyButton({
  courseName,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  children = "Apply for Batch 2",
  icon,
}: ApplyButtonProps) {
  const { openApplyModal } = useApplyModal();

  const variantStyles = {
    primary:
      "bg-[#3A1494] text-white shadow-md hover:bg-[#2c0e78] hover:shadow-lg active:scale-[0.98]",
    secondary:
      "bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]",
    ghost: "bg-transparent text-slate-800 hover:bg-slate-100",
  };

  const sizeStyles = {
    md: "h-11 px-5 text-sm gap-2",
    lg: "h-13 px-7 text-base gap-2.5",
  };

  return (
    <button
      type="button"
      onClick={() => openApplyModal(courseName)}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A1494] focus-visible:ring-offset-2 cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
    >
      <span>{children}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
