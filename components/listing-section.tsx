import { type Listing } from "@/types/listing";
import { ListingsGrid } from "@/components/listings-grid";

interface ListingSectionProps {
  title: string;
  subtitle?: string;
  listings: Listing[];
  loading: boolean;
}

export const ListingSection = ({
  title,
  subtitle,
  listings,
  loading,
}: ListingSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">{title}</h2>
          <span className="text-zinc-400">&gt;</span>
        </div>
        {subtitle ? <p className="text-sm text-zinc-500">{subtitle}</p> : null}
      </div>
      <ListingsGrid listings={listings} loading={loading} />
    </section>
  );
};