interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white px-6 py-10 text-center text-sm text-zinc-500">
      {message}
    </div>
  );
};
