/**
 * Purely decorative — the soft, layered organic surface behind the floating
 * header at the base of the hero. Built from wide, heavily blurred radial
 * shapes rather than an SVG wave path, so the edges stay soft and irregular
 * instead of reading as a crisp section divider.
 *
 * Confined to the lower portion of the hero (bottom-anchored, capped height)
 * so it never reaches the heading, description, CTA, visual or stats above.
 * Colors route entirely through the existing brand tokens (globals.css), so
 * swapping the palette later doesn't require touching this file.
 */
export default function HeroBackgroundShape() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-55 overflow-hidden sm:h-70 lg:h-90"
    >
      {/* Layer 1 — widest, softest base surface, slightly left-of-center */}
      <div
        className="absolute -bottom-24 left-[8%] h-65 w-[115%] rounded-[50%] blur-3xl sm:h-80 lg:-bottom-32 lg:h-105"
        style={{
          background: "radial-gradient(closest-side, var(--brand-secondary) 0%, transparent 72%)",
          opacity: 0.22,
        }}
      />

      {/* Layer 2 — offset right, different size, breaks the symmetry */}
      <div
        className="absolute -bottom-28 right-[4%] h-55 w-[95%] rounded-[50%] blur-3xl sm:h-67.5 lg:-bottom-36 lg:h-90 lg:w-[85%]"
        style={{
          background: "radial-gradient(closest-side, var(--brand-primary) 0%, transparent 70%)",
          opacity: 0.18,
        }}
      />

      {/* Layer 3 — subtle warm highlight, concentrated where the header sits */}
      <div
        className="absolute -bottom-16 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-[50%] blur-3xl lg:h-55 lg:w-[55%]"
        style={{
          background: "radial-gradient(closest-side, var(--brand-secondary) 0%, transparent 65%)",
          opacity: 0.15,
        }}
      />
    </div>
  );
}
