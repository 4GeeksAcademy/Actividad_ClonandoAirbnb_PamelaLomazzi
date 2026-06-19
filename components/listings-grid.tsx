import { type Listing } from "@/components/home-data";
import { ListingCard } from "@/components/listing-card";
import { ListingCardSkeleton } from "@/components/listing-card-skeleton";

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
    return (
      <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white px-6 py-10 text-center text-sm text-zinc-500">
        No hay alojamientos que coincidan con la busqueda y los filtros activos.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};