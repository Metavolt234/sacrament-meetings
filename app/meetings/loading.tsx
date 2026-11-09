export default function Loading() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-dot" />
      <p>Loading meeting programs…</p>
    </div>
  );
}
