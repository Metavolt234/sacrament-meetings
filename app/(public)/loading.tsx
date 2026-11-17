export default function PublicLoading() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-dot" />
      <p>Loading page…</p>
    </div>
  );
}
