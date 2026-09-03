"use client";

import { useApplyModal } from "@/context/ApplyModalContext";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import type { ReactNode } from "react";

interface DownloadCurriculumButtonProps {
  courseName?: string;
  pdfUrl?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
}

export default function DownloadCurriculumButton({
  courseName,
  pdfUrl,
  className,
  variant = "secondary",
  size = "md",
  fullWidth = false,
  children = "Download curriculum",
  icon,
}: DownloadCurriculumButtonProps) {
  const { openCurriculumModal } = useApplyModal();

  const variantStyles = {
    primary:
      "bg-[#3A1494] text-white shadow-md hover:bg-[#2c0e78] hover:shadow-lg active:scale-[0.98]",
    secondary:
      "bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]",
    ghost: "bg-transparent text-slate-800 hover:bg-slate-100",
  };

  const sizeStyles = {
    sm: "h-9 px-4 text-xs gap-1.5",
    md: "h-11 px-5 text-sm gap-2",
    lg: "h-13 px-7 text-base gap-2.5",
  };

  return (
    <button
      type="button"
      onClick={() => openCurriculumModal(courseName, pdfUrl)}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A1494] focus-visible:ring-offset-2 cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
    >
      <span>{children}</span>
      {icon ? (
        <span className="shrink-0">{icon}</span>
      ) : (
        <Download className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
      )}
    </button>
  );
}
