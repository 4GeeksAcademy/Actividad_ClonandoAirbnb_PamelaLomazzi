interface NavbarExpandedSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const NavbarExpandedSearch = ({
  searchTerm,
  onSearchChange,
}: NavbarExpandedSearchProps) => {
  return (
    <label className="mx-auto hidden w-full max-w-4xl items-center rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-md shadow-zinc-200/70 md:flex">
      <div className="flex-1 border-r border-zinc-200 px-4 py-2">
        <p className="text-xs font-semibold">Dónde</p>
        <input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Explora destinos"
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
        />
      </div>
      <div className="flex-1 border-r border-zinc-200 px-4 py-2">
        <p className="text-xs font-semibold">Fecha</p>
        <p className="text-sm text-zinc-500">Agrega fechas</p>
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <p className="text-xs font-semibold">Quién</p>
          <p className="text-sm text-zinc-500">¿Cuántos?</p>
        </div>
        <span className="ml-6 rounded-full bg-rose-500 px-4 py-3 text-sm font-semibold text-white">
          🔍
        </span>
      </div>
    </label>
  );
};
