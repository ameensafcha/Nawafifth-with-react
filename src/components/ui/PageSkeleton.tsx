export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] px-6 md:px-20 py-28 space-y-16 animate-pulse">
      {/* Hero block */}
      <div className="space-y-6 max-w-2xl">
        <div className="h-3 w-24 rounded-full img-skeleton" />
        <div className="h-14 w-3/4 rounded-2xl img-skeleton" />
        <div className="h-14 w-1/2 rounded-2xl img-skeleton" />
        <div className="h-4 w-full rounded-full img-skeleton" />
        <div className="h-4 w-5/6 rounded-full img-skeleton" />
      </div>

      {/* Content cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-[2rem] img-skeleton h-56" />
        ))}
      </div>

      {/* Text block */}
      <div className="space-y-4 max-w-xl">
        <div className="h-4 w-full rounded-full img-skeleton" />
        <div className="h-4 w-4/5 rounded-full img-skeleton" />
        <div className="h-4 w-3/5 rounded-full img-skeleton" />
      </div>
    </div>
  );
}
