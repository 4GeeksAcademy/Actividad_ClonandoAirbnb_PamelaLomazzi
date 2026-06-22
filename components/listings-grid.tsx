import { EmptyState } from "@/components/ui/empty-state";
import { ListingCard } from "@/components/listing-card";
import { ListingCardSkeleton } from "@/components/listing-card-skeleton";
import { type Listing } from "@/types/listing";

interface ListingsGridProps {
  listings: Listing[];
  loading: boolean;
}

export const ListingsGrid = ({ listings, loading }: ListingsGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ListingCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!listings.length) {
    return <EmptyState message="No hay alojamientos que coincidan con la busqueda y los filtros activos." />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};