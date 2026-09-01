import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  /** Unique key used for active-state + mega menu wiring. */
  key: string;
  /** When present, this item opens a mega menu instead of navigating directly. */
  hasMegaMenu?: boolean;
}

export interface MegaMenuLink extends NavLink {
  icon?: LucideIcon;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

export interface MegaMenuPromo {
  eyebrow: string;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface MegaMenuData {
  columns: MegaMenuColumn[];
  promo: MegaMenuPromo;
}
