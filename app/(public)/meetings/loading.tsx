export default function Loading() {
  return (
    <section className="meetings-list meetings-list-loading" aria-busy="true" aria-label="Loading meeting programs">
      <p className="meetings-loading-status" role="status">Loading meeting programs...</p>
      <div className="list-heading" aria-hidden="true">
        <div>
          <span className="eyebrow">MEETING ARCHIVE</span>
          <span className="loading-line loading-line-heading" />
        </div>
        <span className="loading-line loading-line-count" />
      </div>
      <div className="meeting-search" aria-hidden="true">
        <span className="loading-line loading-line-label" />
        <div className="meeting-search__controls">
          <span className="loading-line loading-line-input" />
          <span className="loading-line loading-line-button" />
        </div>
      </div>
      <div className="meeting-grid" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <article className="meeting-card meeting-card-loading" key={index}>
            <div className="card-topline">
              <span className="loading-line loading-line-date" />
              <span className="loading-line loading-line-pill" />
            </div>
            <span className="loading-line loading-line-title" />
            <span className="loading-line loading-line-meta" />
            <div className="card-bottom">
              <span className="loading-line loading-line-items" />
              <span className="loading-line loading-line-link" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
