export default function DecorativeElements() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[30%] -right-8 z-20 hidden w-20 text-right lg:block"
    >
      <p className="rotate-10 font-serif text-base leading-tight text-brand-primary italic">
        Skills Today.
        <br />
        Success Tomorrow.
      </p>
      <svg
        viewBox="0 0 60 46"
        className="mt-1 ml-auto h-11 w-14 -scale-x-100 text-brand-primary/60"
        fill="none"
      >
        <path
          d="M6 4C10 18 18 30 34 34C42 36 48 34 52 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M42 27L52 30L47 39"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
