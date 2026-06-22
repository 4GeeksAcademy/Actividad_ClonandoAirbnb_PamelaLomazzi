import Link from "next/link";

export const RoomNotFound = () => {
  return (
    <section className="rounded-[2rem] border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
      <p className="text-lg font-semibold text-zinc-900">Habitacion no encontrada</p>
      <p className="mt-2 text-sm text-zinc-500">El alojamiento solicitado no existe o ya no esta disponible.</p>
      <Link href="/catalog" className="mt-4 inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
        Volver al catalogo
      </Link>
    </section>
  );
};
