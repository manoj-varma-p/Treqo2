import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export default function Container({ as: Tag = "div", children, className }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
