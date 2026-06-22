import { type Listing } from "@/types/listing";

interface MapPlaceholderProps {
  listings: Listing[];
}

const getMapConfig = (listings: Listing[]) => {
  const sections = new Set(listings.map((listing) => listing.section));

  if (sections.size === 1 && sections.has("madrid")) {
    return {
      label: "Mapa · Madrid",
      src: "https://www.openstreetmap.org/export/embed.html?bbox=-3.89%2C40.31%2C-3.54%2C40.56&layer=mapnik&marker=40.4168%2C-3.7038",
    };
  }

  return {
    label: "Mapa · Buenos Aires",
    src: "https://www.openstreetmap.org/export/embed.html?bbox=-58.74%2C-34.84%2C-58.25%2C-34.43&layer=mapnik&marker=-34.6037%2C-58.3816",
  };
};

export const MapPlaceholder = ({ listings }: MapPlaceholderProps) => {
  const mapConfig = getMapConfig(listings);

  return (
    <aside className="order-last overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-100 md:order-none md:sticky md:top-28 md:min-h-[640px]">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-white/90 px-4 py-3">
        <p className="text-sm font-semibold text-zinc-700">{mapConfig.label}</p>
        <span className="text-xs text-zinc-500">OpenStreetMap</span>
      </div>
      <iframe
        title="Mapa de alojamientos"
        src={mapConfig.src}
        className="h-[280px] w-full md:h-[590px]"
        loading="lazy"
      />
    </aside>
  );
};