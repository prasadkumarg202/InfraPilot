/** Route-level loading state. Deliberately minimal — a full skeleton would
 *  flash on fast connections and read as slower than nothing at all. */
export default function Loading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <span className="route-loading__bar" />
    </div>
  );
}
