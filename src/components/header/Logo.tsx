import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="TREQO home"
      className={cn(
        "inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A1494] focus-visible:ring-offset-2 rounded-md",
        className
      )}
    >
      <span className="text-2xl sm:text-[1.7rem] font-black tracking-tight text-[#3A1494] select-none leading-none">
        TREQO
      </span>
    </Link>
  );
}
