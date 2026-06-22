import { HostRow } from "@/components/host-row";
import { ReservationCard } from "@/components/reservation-card";
import { RoomHeader } from "@/components/room-header";
import { RoomPhotoCarousel } from "@/components/room-photo-carousel";
import { ServicesGrid } from "@/components/services-grid";
import { type RoomDetail } from "@/types/room";

interface RoomDetailLayoutProps {
  room: RoomDetail;
}

export const RoomDetailLayout = ({ room }: RoomDetailLayoutProps) => {
  return (
    <section className="flex flex-col gap-6">
      <RoomHeader
        title={room.title}
        rating={room.rating}
        reviewsCount={room.reviewsCount}
        location={room.location}
        guests={room.guests}
        bedrooms={room.bedrooms}
        beds={room.beds}
        bathrooms={room.bathrooms}
      />
      <RoomPhotoCarousel photos={room.photos} title={room.title} />
      <section className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_360px] md:items-start md:gap-8">
        <section className="space-y-4">
          <HostRow host={room.host} />
          <ServicesGrid services={room.services} />
        </section>
        <ReservationCard
          pricePerNight={room.pricePerNight}
          currency={room.currency}
          maxGuests={room.maxGuests}
        />
      </section>
    </section>
  );
};
