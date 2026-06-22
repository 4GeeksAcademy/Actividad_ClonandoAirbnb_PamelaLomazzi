"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { NavbarExpandedSearch } from "@/components/navbar-expanded-search";
import { NavbarTabs } from "@/components/navbar-tabs";
import { SearchBar } from "@/components/search-bar";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Navbar = ({ searchTerm, onSearchChange }: NavbarProps) => {
  const [showExpanded, setShowExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowExpanded(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center" aria-label="Airbnb">
          <BrandLogo />
          </Link>
          <div className="hidden flex-1 items-center justify-center md:flex">
            {showExpanded ? <NavbarTabs /> : <SearchBar value={searchTerm} onChange={onSearchChange} />}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/catalog" className="hidden rounded-full px-4 py-3 text-sm font-medium hover:bg-zinc-100 md:inline-flex">
              Catalogo
            </Link>
            <button className="rounded-full bg-zinc-100 p-3 hover:bg-zinc-200">🌐</button>
            <button className="rounded-full bg-zinc-100 p-3 hover:bg-zinc-200">☰</button>
          </div>
        </div>
        <div className="md:hidden">
          <SearchBar value={searchTerm} onChange={onSearchChange} />
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${showExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <NavbarExpandedSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
      </div>
    </header>
  );
};