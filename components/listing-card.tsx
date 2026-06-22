import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
}

const formatter = new Intl.NumberFormat("es-UY");

export const ListingCard = ({ listing }: ListingCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const roomHref = `/rooms/${listing.id}`;

  return (
    <article className="relative flex flex-col gap-3">
      <Link
        href={roomHref}
        aria-label={`Ver detalle de ${listing.title}`}
        className="absolute inset-0 z-10 rounded-[2rem]"
      />
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-zinc-100">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
        {listing.badge ? (
          <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-white px-3 py-2 text-xs font-semibold shadow-sm">
            {listing.badge}
          </span>
        ) : null}
        <button
          onClick={() => setIsFavorite((value) => !value)}
          className="absolute right-3 top-3 z-20 rounded-full bg-black/25 p-2 text-white backdrop-blur"
          aria-label="Guardar alojamiento"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"}>
            <path d="M12 20.5 4.8 13.7a4.8 4.8 0 0 1 6.8-6.8L12 7.3l.4-.4a4.8 4.8 0 0 1 6.8 6.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-zinc-900">{listing.title}</h3>
          <span className="shrink-0 text-zinc-600">{listing.rating.toFixed(2)}</span>
        </div>
        <p className="text-zinc-500">{listing.location}</p>
        <p className="text-zinc-500">{listing.currency} {formatter.format(listing.price)} por 2 noches</p>
      </div>
    </article>
  );
};