import { type ServiceItem } from "@/types/room";

interface ServicesGridProps {
  services: ServiceItem[];
}

export const ServicesGrid = ({ services }: ServicesGridProps) => {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {services.map((service) => (
        <article key={service.id} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">{service.icon}</span>
          <span className="text-sm font-medium text-zinc-700">{service.label}</span>
        </article>
      ))}
    </section>
  );
};
