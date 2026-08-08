export default function Loading() {
  return (
    <div
      className="grid min-h-[70vh] place-items-center bg-cream px-5 pt-[72px]"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="relative block h-11 w-11" aria-hidden="true">
          <span className="absolute inset-0 rounded-full border-2 border-brand/15" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand" />
        </span>
        <p className="text-sm font-medium text-muted">Loading content…</p>
      </div>
    </div>
  );
}
