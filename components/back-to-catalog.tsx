import Link from "next/link";

interface BackToCatalogProps {
  label?: string;
}

export const BackToCatalog = ({ label = "Volver a catalogo" }: BackToCatalogProps) => {
  return (
    <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-900">
      <span aria-hidden="true">←</span>
      {label}
    </Link>
  );
};
