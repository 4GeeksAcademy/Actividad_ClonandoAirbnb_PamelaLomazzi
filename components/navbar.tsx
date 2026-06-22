import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SearchBar } from "@/components/search-bar";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Navbar = ({ searchTerm, onSearchChange }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="Airbnb"
        >
          <BrandLogo />
        </Link>
        <SearchBar value={searchTerm} onChange={onSearchChange} />
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/catalog" className="rounded-full px-4 py-3 text-sm font-medium hover:bg-zinc-100">
            Ir a catalogo
          </Link>
          <button className="rounded-full bg-zinc-100 p-3 hover:bg-zinc-200">O</button>
          <button className="rounded-full bg-zinc-100 p-3 hover:bg-zinc-200">=</button>
        </div>
      </div>
    </header>
  );
};