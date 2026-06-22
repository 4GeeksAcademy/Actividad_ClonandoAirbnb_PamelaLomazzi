"use client";

import { useState } from "react";

interface ReservationCardProps {
  pricePerNight: number;
  currency: string;
  maxGuests: number;
}

const formatter = new Intl.NumberFormat("es-UY");

export const ReservationCard = ({
  pricePerNight,
  currency,
  maxGuests,
}: ReservationCardProps) => {
  const [guests, setGuests] = useState(1);

  const decreaseGuests = () => setGuests((value) => Math.max(1, value - 1));
  const increaseGuests = () => setGuests((value) => Math.min(maxGuests, value + 1));

  return (
    <aside className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-sm md:sticky md:top-28">
      <p className="text-sm font-medium text-zinc-500">Precio por noche</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">{currency} {formatter.format(pricePerNight)}</p>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2">
        <span className="text-sm font-medium">Huespedes: {guests}</span>
        <div className="flex items-center gap-2">
          <button onClick={decreaseGuests} disabled={guests === 1} className="h-9 w-9 rounded-full border border-zinc-300 disabled:opacity-40">-</button>
          <button onClick={increaseGuests} disabled={guests === maxGuests} className="h-9 w-9 rounded-full border border-zinc-300 disabled:opacity-40">+</button>
        </div>
      </div>
      <button className="mt-4 w-full rounded-xl bg-zinc-900 px-4 py-3 text-white">Reservar ahora</button>
    </aside>
  );
};
