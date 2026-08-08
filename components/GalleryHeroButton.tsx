"use client";

function GalleryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="m5.5 17 4.2-4.2 3.1 3.1 2.1-2.1 3.6 3.2" />
    </svg>
  );
}

export default function GalleryHeroButton({imageCount}: {imageCount: number}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("hli:open-program-gallery"))}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-soft transition-all duration-300 hover:bg-white/90 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
      aria-label={`View gallery with ${imageCount} ${imageCount === 1 ? "image" : "images"}`}
    >
      <GalleryIcon />
      View gallery
      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs tabular-nums">{imageCount}</span>
    </button>
  );
}
