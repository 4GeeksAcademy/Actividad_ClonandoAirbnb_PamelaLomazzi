import { type Listing } from "@/components/home-data";
import { ListingCard } from "@/components/listing-card";

interface CatalogListProps {
  listings: Listing[];
}

export const CatalogList = ({ listings }: CatalogListProps) => {
  if (!listings.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white px-6 py-10 text-center text-sm text-zinc-500">
        No hay alojamientos que coincidan con la busqueda actual.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};