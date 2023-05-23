import { Divider, GreyCardList, GreyCardSkeleton } from "@/components";

export default function Loading() {
  return (
    <article className="space-y-10">
      {Array.from({ length: 26 }, (_, i) => (
        <section key={i} className="space-y-5">
          <h2 className="mt-0 mb-3 text-2xl font-bold">{String.fromCharCode(97 + i)}</h2>
          <Divider />
          <GreyCardList>
            {Array.from({ length: 8 }, (_, i) => (
              <GreyCardSkeleton key={i} />
            ))}
          </GreyCardList>
        </section>
      ))}
    </article>
  );
}
