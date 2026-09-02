import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="treqo home"
      className={cn(
        "inline-flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A1494] focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3A1494] text-white shadow-xs">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-6h2v6zm0-8h-2V6h2v2z" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black tracking-tight text-[#3A1494]">
          treqo
        </span>
        <span className="text-[8px] font-bold tracking-[0.18em] text-slate-400 uppercase mt-0.5">
          THE MARKETING SCHOOL
        </span>
      </div>
    </Link>
  );
}
