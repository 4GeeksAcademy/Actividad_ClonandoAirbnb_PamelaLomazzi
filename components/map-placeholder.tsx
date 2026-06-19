interface MapPlaceholderProps {
  label?: string;
}

export const MapPlaceholder = ({ label = "Mapa" }: MapPlaceholderProps) => {
  return (
    <aside className="order-last flex min-h-[280px] items-center justify-center rounded-[2rem] bg-zinc-200 text-lg font-semibold text-zinc-600 md:order-none md:sticky md:top-28 md:min-h-[640px]">
      {label}
    </aside>
  );
};