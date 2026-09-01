export type ClassValue = string | number | false | null | undefined;

/** Joins truthy class names together. Keeps class composition readable without an extra dependency. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
