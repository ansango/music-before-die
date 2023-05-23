export default function Loading() {
  return (
    <section className="space-y-10">
      {Array.from({ length: 26 }, (_, i) => (
        <div key={i} className="space-y-5">
          <h2 className="mt-0 mb-3 text-2xl font-bold">{String.fromCharCode(97 + i)}</h2>
          <div className="!m-0 divider" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="p-8 bg-base-200 animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
