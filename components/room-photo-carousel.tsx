import Image from "next/image";
import { useState } from "react";

interface RoomPhotoCarouselProps {
  photos: string[];
  title: string;
}

export const RoomPhotoCarousel = ({ photos, title }: RoomPhotoCarouselProps) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!photos.length) {
    return <div className="aspect-[4/3] rounded-[2rem] bg-zinc-200" />;
  }

  const goNext = () => {
    setActivePhotoIndex((current) => (current + 1) % photos.length);
  };

  const goPrev = () => {
    setActivePhotoIndex((current) => (current - 1 + photos.length) % photos.length);
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-zinc-100">
      <div className="relative aspect-[4/3] md:aspect-[16/9]">
        <Image src={photos[activePhotoIndex]} alt={title} fill className="object-cover" />
      </div>
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3">
        <button onClick={goPrev} className="rounded-full bg-white/85 px-3 py-2 text-xs font-semibold">Anterior</button>
        <button onClick={goNext} className="rounded-full bg-white/85 px-3 py-2 text-xs font-semibold">Siguiente</button>
      </div>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs text-white">
        {activePhotoIndex + 1} / {photos.length}
      </span>
    </section>
  );
};
