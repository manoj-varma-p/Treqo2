import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Treqqo home"
      className={cn(
        "shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className
      )}
    >
      <Image
        src="/logo.png"
        alt="Treqqo"
        width={260}
        height={100}
        priority
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
