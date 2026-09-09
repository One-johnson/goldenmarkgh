"use client";

export default function ScrollCue({
  targetId = "content-start",
  className = "",
}: {
  targetId?: string;
  className?: string;
}) {
  return (
    <a
      href={`#${targetId}`}
      className={`group absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-gold-light/80 transition hover:text-gold-light sm:bottom-8 sm:gap-2 ${className}`.trim()}
      aria-label="Scroll to content"
    >
      <span className="motion-safe:animate-bounce-subtle flex flex-col items-center gap-1.5 sm:gap-2">
        <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] opacity-80 transition group-hover:opacity-100 sm:inline">
          Scroll
        </span>
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </span>
    </a>
  );
}
