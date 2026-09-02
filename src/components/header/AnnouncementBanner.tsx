import Link from "next/link";
import { announcementBannerData } from "@/data/navigation";

export default function AnnouncementBanner() {
  return (
    <div className="hidden sm:block w-full bg-[#0a0c10] py-2 px-4 text-center text-xs sm:text-sm text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 sm:gap-3">
        <span className="inline-flex items-center rounded-md bg-[#3A1494] border border-[#4d1bb8] px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-2xs">
          {announcementBannerData.badge}
        </span>
        <span className="font-medium text-white/90">
          {announcementBannerData.text}
        </span>
        <Link
          href={announcementBannerData.linkHref}
          className="font-bold text-white underline decoration-white/60 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
        >
          {announcementBannerData.linkText}
        </Link>
      </div>
    </div>
  );
}
