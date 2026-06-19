"use client";

import { useState } from "react";
import { type Listing, mockListings } from "@/components/home-data";
import { CatalogList } from "@/components/catalog-list";
import { CatalogResultsHeader, type PriceSortOrder } from "@/components/catalog-results-header";
import { MapPlaceholder } from "@/components/map-placeholder";
import { Navbar } from "@/components/navbar";

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<PriceSortOrder>("asc");
  const [catalogListings] = useState<Listing[]>(mockListings);

  const visibleListings = [...catalogListings]
    .filter((listing) => {
      const searchable = `${listing.title} ${listing.location}`.toLowerCase();
      return searchable.includes(searchTerm.toLowerCase());
    })
    .sort((first, second) => {
      return sortOrder === "asc"
        ? first.price - second.price
        : second.price - first.price;
    });

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-zinc-900">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 md:px-8 md:py-6">
        <CatalogResultsHeader
          resultsCount={visibleListings.length}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        <section className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,1fr)_380px] md:items-start md:gap-8">
          <CatalogList listings={visibleListings} />
          <MapPlaceholder />
        </section>
      </main>
    </div>
  );
};

export default CatalogPage;