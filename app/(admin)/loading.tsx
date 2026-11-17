export default function AdminLoading() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-dot" />
      <p>Loading leader resources…</p>
    </div>
  );
}
