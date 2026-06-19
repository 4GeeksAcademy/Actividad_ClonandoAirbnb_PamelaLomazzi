import { SearchBar } from "@/components/search-bar";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Navbar = ({ searchTerm, onSearchChange }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-2 text-[1.7rem] font-bold tracking-tight text-rose-500">
          <span className="rounded-2xl border-2 border-current px-2 py-0.5 text-base">A</span>
          <span>airbnb</span>
        </div>
        <SearchBar value={searchTerm} onChange={onSearchChange} />
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full px-4 py-3 text-sm font-medium hover:bg-zinc-100">
            Conviertete en anfitrion
          </button>
          <button className="rounded-full bg-zinc-100 p-3 hover:bg-zinc-200">O</button>
          <button className="rounded-full bg-zinc-100 p-3 hover:bg-zinc-200">=</button>
        </div>
      </div>
    </header>
  );
};