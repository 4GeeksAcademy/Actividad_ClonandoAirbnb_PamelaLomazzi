import { ListingCard } from "@/components/listing-card";
import { EmptyState } from "@/components/ui/empty-state";
import { type Listing } from "@/types/listing";

interface CatalogListProps {
  listings: Listing[];
}

export const CatalogList = ({ listings }: CatalogListProps) => {
  if (!listings.length) {
    return <EmptyState message="No hay alojamientos que coincidan con la busqueda actual." />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};