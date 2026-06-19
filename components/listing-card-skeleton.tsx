export const ListingCardSkeleton = () => {
  return (
    <article className="animate-pulse space-y-3">
      <div className="aspect-[4/3] rounded-[2rem] bg-zinc-200" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-zinc-200" />
        <div className="h-4 w-1/2 rounded bg-zinc-200" />
        <div className="h-4 w-2/3 rounded bg-zinc-200" />
      </div>
    </article>
  );
};