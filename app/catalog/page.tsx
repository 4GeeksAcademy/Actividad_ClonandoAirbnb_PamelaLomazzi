"use client";

import { useState } from "react";
import { mockListings } from "@/data/listings";
import { CatalogList } from "@/components/catalog-list";
import { CatalogResultsHeader } from "@/components/catalog-results-header";
import { MapPlaceholder } from "@/components/map-placeholder";
import { Navbar } from "@/components/navbar";
import { PageContainer } from "@/components/ui/page-container";
import { type PriceSortOrder } from "@/types/catalog";
import { type Listing } from "@/types/listing";

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
      <PageContainer>
        <section className="flex flex-col gap-6">
          <CatalogResultsHeader
            resultsCount={visibleListings.length}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
          <section className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,1fr)_380px] md:items-start md:gap-8">
            <CatalogList listings={visibleListings} />
            <MapPlaceholder listings={visibleListings} />
          </section>
        </section>
      </PageContainer>
    </div>
  );
};

export default CatalogPage;