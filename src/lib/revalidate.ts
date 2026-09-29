import { revalidatePath } from "next/cache";

/**
 * Universal revalidation function to bust Next.js App Router cache
 * across all public pages, layouts, and dynamic routes whenever an admin
 * saves changes to SEO, content, programs, tutors, blogs, or site settings.
 */
export function revalidatePublicSite(extraPaths: (string | undefined | null)[] = []) {
  try {
    // 1. Invalidate root layout (revalidates global metadata, banner, footer, header, tracking)
    revalidatePath("/", "layout");

    // 2. Invalidate primary pages
    revalidatePath("/", "page");
    revalidatePath("/courses", "page");
    revalidatePath("/programs", "page");
    revalidatePath("/blog", "page");

    // 3. Invalidate dynamic catch-all and param pages
    revalidatePath("/courses/[slug]", "page");
    revalidatePath("/programs/[slug]", "page");
    revalidatePath("/categories/[slug]", "page");
    revalidatePath("/categories/courses/[slug]", "page");
    revalidatePath("/blog/[slug]", "page");

    // 4. Invalidate any specific individual paths
    for (const rawPath of extraPaths) {
      if (rawPath && typeof rawPath === "string") {
        const cleanPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
        try {
          revalidatePath(cleanPath, "page");
          revalidatePath(cleanPath);
        } catch {
          // ignore non-fatal single-path revalidation errors
        }
      }
    }
  } catch (err) {
    console.warn("[revalidatePublicSite] Cache bust error (non-fatal):", err);
  }
}
