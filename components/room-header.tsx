interface RoomHeaderProps {
  title: string;
  rating: number;
  reviewsCount: number;
  location: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export const RoomHeader = ({
  title,
  rating,
  reviewsCount,
  location,
  guests,
  bedrooms,
  beds,
  bathrooms,
}: RoomHeaderProps) => {
  return (
    <section className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-700">
        <span>{rating.toFixed(2)} ({reviewsCount})</span>
        <span>•</span>
        <span>{location}</span>
      </p>
      <p className="text-sm text-zinc-600">
        {guests} huespedes · {bedrooms} habitacion · {beds} cama · {bathrooms} bano
      </p>
    </section>
  );
};
