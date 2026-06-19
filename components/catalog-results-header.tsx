export type PriceSortOrder = "asc" | "desc";

interface CatalogResultsHeaderProps {
  resultsCount: number;
  sortOrder: PriceSortOrder;
  onSortChange: (order: PriceSortOrder) => void;
}

export const CatalogResultsHeader = ({
  resultsCount,
  sortOrder,
  onSortChange,
}: CatalogResultsHeaderProps) => {
  return (
    <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-400">
          Resultados
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          {resultsCount} alojamientos
        </h1>
      </div>
      <label className="flex items-center gap-3 self-start rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm md:self-auto">
        <span>Precio</span>
        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value as PriceSortOrder)}
          className="bg-transparent outline-none"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </label>
    </section>
  );
};