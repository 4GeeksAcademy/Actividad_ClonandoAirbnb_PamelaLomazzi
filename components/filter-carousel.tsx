import { type FilterItem, type FilterValue } from "@/components/home-data";

interface FilterCarouselProps {
  items: FilterItem[];
  activeCategory: FilterValue;
  onCategoryChange: (category: FilterValue) => void;
}

export const FilterCarousel = ({
  items,
  activeCategory,
  onCategoryChange,
}: FilterCarouselProps) => {
  return (
    <section className="overflow-x-auto border-b border-zinc-200">
      <div className="flex min-w-max gap-5 py-3">
        {items.map((item) => {
          const active = item.id === activeCategory;

          return (
            <button
              key={item.id}
              onClick={() => onCategoryChange(item.id)}
              className={`flex shrink-0 flex-col items-center gap-2 border-b-2 px-1 pb-3 pt-1 text-xs transition ${
                active
                  ? "border-zinc-900 text-zinc-900"
                  : "border-transparent text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <span className="text-[10px] font-semibold tracking-[0.25em]">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};