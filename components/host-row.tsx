import Image from "next/image";
import { type HostInfo } from "@/types/room";

interface HostRowProps {
  host: HostInfo;
}

export const HostRow = ({ host }: HostRowProps) => {
  return (
    <section className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="relative h-14 w-14 overflow-hidden rounded-full bg-zinc-100">
        <Image src={host.avatar} alt={host.name} fill className="object-cover" />
      </div>
      <div>
        <p className="font-semibold text-zinc-900">Anfitrion: {host.name}</p>
        <p className="text-sm text-zinc-500">{host.yearsHosting} anos hospedando</p>
      </div>
    </section>
  );
};
