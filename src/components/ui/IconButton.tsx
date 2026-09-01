import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  icon: ReactNode;
  "aria-label": string;
  variant?: "solid" | "outline";
  className?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, variant = "outline", className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        variant === "outline" &&
          "border border-border-subtle bg-surface text-text-secondary hover:border-brand-primary/40 hover:text-brand-primary",
        variant === "solid" && "bg-surface-alt text-text-primary hover:bg-border-subtle",
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
});

export default IconButton;
