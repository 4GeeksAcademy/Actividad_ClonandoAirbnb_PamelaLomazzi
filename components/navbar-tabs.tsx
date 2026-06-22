export const NavbarTabs = () => {
  return (
    <nav className="flex items-end gap-10 text-zinc-500" aria-label="Secciones">
      <button className="border-b-2 border-zinc-900 pb-2 text-zinc-900">
        <span className="flex items-center gap-2 text-[1.9rem]">🏠 <span className="text-3xl font-medium">Alojamientos</span></span>
      </button>
      <button className="pb-2 text-3xl font-medium hover:text-zinc-700">
        <span className="flex items-center gap-2">🎈 Experiencias</span>
      </button>
      <button className="pb-2 text-3xl font-medium hover:text-zinc-700">
        <span className="flex items-center gap-2">🛎️ Servicios</span>
      </button>
    </nav>
  );
};
