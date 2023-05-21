import { genres } from "@/constants/genres";

export default function Loading() {
  return (
    <section className="space-y-10 py-container">
      {Array.from(genres, (_, i) => (
        <div key={i} className="space-y-5">
          <h2 className="text-2xl font-bold">{genres[i].toLowerCase()}</h2>

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
