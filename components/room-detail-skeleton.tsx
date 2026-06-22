export const RoomDetailSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-40 rounded bg-zinc-200" />
      <div className="h-10 w-2/3 rounded bg-zinc-200" />
      <div className="aspect-[4/3] rounded-[2rem] bg-zinc-200 md:aspect-[16/9]" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-3">
          <div className="h-16 rounded-2xl bg-zinc-200" />
          <div className="h-40 rounded-2xl bg-zinc-200" />
        </div>
        <div className="h-56 rounded-[2rem] bg-zinc-200" />
      </div>
    </div>
  );
};
