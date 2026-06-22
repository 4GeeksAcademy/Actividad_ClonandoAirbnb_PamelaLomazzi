"use client";

import { useEffect, useState } from "react";
import { filterItems, mockListings, sections } from "@/data/listings";
import { FilterCarousel } from "@/components/filter-carousel";
import { ListingSection } from "@/components/listing-section";
import { Navbar } from "@/components/navbar";
import { PageContainer } from "@/components/ui/page-container";
import { type FilterValue } from "@/types/listing";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterValue>("all");
  const [listings, setListings] = useState(mockListings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setListings(mockListings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = `${listing.title} ${listing.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || listing.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-zinc-900">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PageContainer>
        <section className="flex flex-col gap-8 md:gap-10">
          <FilterCarousel
            items={filterItems}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          {sections.map((section) => (
            <ListingSection
              key={section.id}
              title={section.title}
              subtitle={section.subtitle}
              loading={loading}
              listings={filteredListings.filter((item) => item.section === section.id)}
            />
          ))}
        </section>
      </PageContainer>
    </div>
  );
};

export default HomePage;
