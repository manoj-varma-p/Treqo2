import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

interface ButtonAsLink extends SharedProps {
  href: string;
  onClick?: never;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

interface ButtonAsButton extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: never;
  download?: never;
  target?: never;
  rel?: never;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-text-inverse shadow-[0_12px_24px_-8px_rgba(67,56,202,0.55)] hover:bg-brand-primary-dark hover:shadow-[0_16px_28px_-8px_rgba(67,56,202,0.6)]",
  secondary:
    "bg-surface text-text-primary border border-border-subtle hover:border-brand-primary/40 hover:bg-surface-alt",
  ghost: "bg-transparent text-text-primary hover:bg-surface-alt",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  iconPosition = "right",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </>
  );

  if (href) {
    const linkProps = rest as Partial<ButtonAsLink>;
    if (linkProps.download || linkProps.target === "_blank") {
      return (
        <a
          href={href}
          download={linkProps.download}
          target={linkProps.target}
          rel={linkProps.rel || (linkProps.target === "_blank" ? "noopener noreferrer" : undefined)}
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
