# Especificación Técnica Home Airbnb Clone

## Objetivo

Construir una Home inspirada en Airbnb con enfoque Mobile-First usando Next.js App Router, React con TypeScript y Tailwind CSS. El viewport base es de 375px y la interfaz debe adaptarse a escritorio desde 768px usando prefijos responsive de Tailwind `md:`.

La pantalla se compone de:

1. Navbar con logo, búsqueda y accesos rápidos.
2. Fila de filtros con scroll horizontal y categoría activa.
3. Secciones de listados con grillas de tarjetas reutilizables.
4. Estado local para búsqueda y filtros.
5. Simulación de fetch con `useEffect` + `setTimeout` de 1 segundo.

## Estructura de Archivos Propuesta

### Páginas en /app

- [app/page.tsx](app/page.tsx): compone la Home y centraliza el estado de búsqueda, categoría activa y datos cargados.

### Componentes reutilizables en /components

- [components/navbar.tsx](components/navbar.tsx): barra superior mobile-first.
- [components/search-bar.tsx](components/search-bar.tsx): input controlado de búsqueda.
- [components/filter-carousel.tsx](components/filter-carousel.tsx): fila horizontal de categorías.
- [components/listing-section.tsx](components/listing-section.tsx): bloque con título, subtítulo y grilla.
- [components/listings-grid.tsx](components/listings-grid.tsx): resuelve loading, empty state y cards.
- [components/listing-card.tsx](components/listing-card.tsx): tarjeta individual.
- [components/listing-card-skeleton.tsx](components/listing-card-skeleton.tsx): estado visual de carga.

## Tipos de Dominio

Estos tipos pueden vivir al inicio de [app/page.tsx](app/page.tsx) o en un archivo futuro como `types/listing.ts`.

```ts
export type CategoryKey =
	| "playa"
	| "piscinas"
	| "centro"
	| "lujo"
	| "romantico"
	| "vistas";

export interface Listing {
	id: string;
	title: string;
	location: string;
	price: number;
	currency: string;
	rating: number;
	image: string;
	badge?: string;
	category: CategoryKey;
	section: "buenos-aires" | "madrid";
}

export interface FilterItem {
	id: CategoryKey;
	label: string;
	icon: string;
}

export interface ListingSectionData {
	id: "buenos-aires" | "madrid";
	title: string;
	subtitle?: string;
}
```

## Jerarquía de Componentes

```text
app/page.tsx
	HomePage
		Navbar
			SearchBar
		FilterCarousel
		ListingSection (x2)
			ListingsGrid
				ListingCard | ListingCardSkeleton
```

## Componente: HomePage

**Ubicación**

- [app/page.tsx](app/page.tsx)

**Responsabilidad**

Contenedor principal de la Home. Orquesta el estado global de la pantalla: búsqueda, filtro activo, loading y listados visibles.

**Props**

No recibe props. Es una página del App Router.

**Estado local**

```ts
const [searchTerm, setSearchTerm] = useState("");
const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all");
const [listings, setListings] = useState<Listing[]>([]);
const [loading, setLoading] = useState(true);
```

**Efectos**

```ts
useEffect(() => {
	const timer = setTimeout(() => {
		setListings(mockListings);
		setLoading(false);
	}, 1000);

	return () => clearTimeout(timer);
}, []);
```

**Datos derivados**

```ts
const filteredListings = listings.filter((listing) => {
	const matchesSearch = `${listing.title} ${listing.location}`
		.toLowerCase()
		.includes(searchTerm.toLowerCase());

	const matchesCategory =
		activeCategory === "all" || listing.category === activeCategory;

	return matchesSearch && matchesCategory;
});
```

**Layout Tailwind**

- Wrapper principal: `min-h-screen bg-white text-zinc-900`
- Columna base: `flex flex-col`
- Contenedor general: `mx-auto w-full max-w-7xl px-4 md:px-8`
- Espaciado vertical: `gap-8 py-4 md:gap-10 md:py-6`

**Notas de implementación**

- Debe marcarse como Client Component con `"use client"` porque usa `useState` y `useEffect`.
- Debe delegar la UI a componentes cortos para respetar el límite de ~80 líneas por componente.

## Componente: Navbar

**Ubicación**

- [components/navbar.tsx](components/navbar.tsx)

**Responsabilidad**

Renderiza logo, input de búsqueda y acciones secundarias. En móvil prioriza el campo de búsqueda; en escritorio agrega CTA y accesos de usuario.

**Props y tipado**

```ts
interface NavbarProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
}
```

**Estado local**

- No necesita estado propio si el valor del input está controlado por la página.

**Efectos**

- No requiere `useEffect`.

**Relación con búsqueda obligatoria**

- El requerimiento de guardar texto en `useState` se resuelve en `HomePage`.
- `Navbar` recibe `searchTerm` y `onSearchChange` para actualizar el filtro en tiempo real.

**Layout Tailwind**

- Header sticky: `sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur`
- Inner layout móvil: `flex flex-col gap-3 py-3`
- Inner layout desktop: `md:flex-row md:items-center md:justify-between`
- Zona derecha desktop: `hidden md:flex md:items-center md:gap-3`

## Componente: SearchBar

**Ubicación**

- [components/search-bar.tsx](components/search-bar.tsx)

**Responsabilidad**

Input controlado para búsqueda por título o ubicación.

**Props y tipado**

```ts
interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}
```

**Estado local**

- No necesita `useState`; opera como controlled input.

**Efectos**

- No requiere `useEffect`.

**Eventos clave**

```ts
<input
	value={value}
	onChange={(event) => onChange(event.target.value)}
/>
```

**Layout Tailwind**

- Wrapper: `flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-3 shadow-sm`
- Input: `w-full bg-transparent text-sm outline-none placeholder:text-zinc-400`
- Desktop: `md:min-w-[420px]`

## Componente: FilterCarousel

**Ubicación**

- [components/filter-carousel.tsx](components/filter-carousel.tsx)

**Responsabilidad**

Muestra categorías seleccionables en scroll horizontal.

**Props y tipado**

```ts
interface FilterCarouselProps {
	items: FilterItem[];
	activeCategory: CategoryKey | "all";
	onCategoryChange: (category: CategoryKey | "all") => void;
}
```

**Estado local obligatorio**

El requisito pide `useState` para resaltar la categoría activa. La implementación recomendada es elevar ese estado a `HomePage` para que filtre datos y resaltar desde props.

Si se quisiera estado local visual interno:

```ts
const [hoveredCategory, setHoveredCategory] = useState<CategoryKey | "all" | null>(null);
```

Pero el estado activo real debe vivir en la página.

**Efectos**

- No requiere `useEffect`.

**Eventos clave**

```ts
onClick={() => onCategoryChange(item.id)}
```

**Layout Tailwind**

- Wrapper: `overflow-x-auto border-b border-zinc-100`
- Track: `flex min-w-max gap-3 py-3`
- Botón base: `flex shrink-0 flex-col items-center gap-2 border-b-2 px-2 pb-3 pt-1 text-xs`
- Activo: `border-zinc-900 text-zinc-900`
- Inactivo: `border-transparent text-zinc-400 hover:text-zinc-700`

## Componente: ListingSection

**Ubicación**

- [components/listing-section.tsx](components/listing-section.tsx)

**Responsabilidad**

Agrupa título, subtítulo opcional y una instancia de `ListingsGrid` para una sección de contenido.

**Props y tipado**

```ts
interface ListingSectionProps {
	title: string;
	subtitle?: string;
	listings: Listing[];
	loading: boolean;
}
```

**Estado local**

- No necesita estado propio.

**Efectos**

- No requiere `useEffect`.

**Layout Tailwind**

- Section: `flex flex-col gap-4`
- Headline row: `flex items-center justify-between`
- Título: `text-2xl font-semibold tracking-tight`
- Subtítulo: `text-sm text-zinc-500`

## Componente: ListingsGrid

**Ubicación**

- [components/listings-grid.tsx](components/listings-grid.tsx)

**Responsabilidad**

Renderiza skeletons, empty state o tarjetas según el estado de carga y resultados.

**Props y tipado**

```ts
interface ListingsGridProps {
	listings: Listing[];
	loading: boolean;
}
```

**Estado local**

- No necesita estado propio si `loading` se resuelve en la página.

**Efectos**

- No requiere `useEffect` dentro del componente si recibe datos ya procesados.

**Requisito de fetch simulado**

- El `useEffect` con `setTimeout` de 1 segundo debe vivir en `HomePage`.
- `ListingsGrid` solo responde a `loading`.

**Reglas de render**

```ts
if (loading) return <SkeletonGrid />;
if (!listings.length) return <EmptyState />;
return listings.map(...);
```

**Layout Tailwind**

- Grilla móvil: `grid grid-cols-1 gap-6`
- Tablet: `md:grid-cols-2`
- Desktop amplio opcional: `xl:grid-cols-4`

## Componente: ListingCard

**Ubicación**

- [components/listing-card.tsx](components/listing-card.tsx)

**Responsabilidad**

Muestra la imagen, badge, favorito, título, ubicación, precio y rating.

**Props y tipado**

```ts
interface ListingCardProps {
	listing: Listing;
}
```

**Estado local**

Opcional si se quiere interacción local de favorito:

```ts
const [isFavorite, setIsFavorite] = useState(false);
```

Este estado es puramente visual y no afecta el filtrado.

**Efectos**

- No requiere `useEffect`.

**Layout Tailwind**

- Card: `flex flex-col gap-3`
- Media wrapper: `relative aspect-[4/3] overflow-hidden rounded-3xl`
- Imagen: `object-cover`
- Badge: `absolute left-3 top-3 rounded-full bg-white px-3 py-2 text-xs font-medium shadow`
- Favorite button: `absolute right-3 top-3 rounded-full bg-black/20 p-2 text-white backdrop-blur`
- Texto: `space-y-1`

## Componente: ListingCardSkeleton

**Ubicación**

- [components/listing-card-skeleton.tsx](components/listing-card-skeleton.tsx)

**Responsabilidad**

Representar una tarjeta placeholder mientras `loading` sea true.

**Props**

No necesita props.

**Estado local**

- No usa estado.

**Efectos**

- No usa efectos.

**Layout Tailwind**

- Wrapper: `animate-pulse space-y-3`
- Imagen fake: `aspect-[4/3] rounded-3xl bg-zinc-200`
- Líneas fake: `h-4 rounded bg-zinc-200`

## Distribución de Estado Recomendada

Para mantener componentes cortos y reutilizables:

- `HomePage`: `searchTerm`, `activeCategory`, `listings`, `loading`
- `Navbar`: sin estado; UI controlada por props
- `SearchBar`: sin estado; input controlado
- `FilterCarousel`: sin estado real de negocio; recibe `activeCategory`
- `ListingCard`: `isFavorite` opcional solo visual

## Estrategia Mobile-First

### Base móvil 375px

- Navbar apilada verticalmente.
- Search bar ocupa todo el ancho.
- Filtros con scroll horizontal y sin wrap.
- Tarjetas en una sola columna.
- Espaciado horizontal reducido: `px-4`.

### Adaptación desde 768px

- Navbar pasa a fila horizontal con CTA y menú visible.
- Search bar se centra visualmente con ancho máximo.
- Secciones aumentan padding lateral: `md:px-8`.
- Grilla pasa a 2 columnas como mínimo.
- Se puede escalar a 3 o 4 columnas en anchos mayores.

## Contrato de Datos Mock

Ejemplo de arreglo local para simular la API:

```ts
const mockListings: Listing[] = [
	{
		id: "ba-1",
		title: "Apartamento en Buenos Aires",
		location: "Buenos Aires",
		price: 5211,
		currency: "UYU",
		rating: 5,
		image: "/images/buenos-aires-1.jpg",
		badge: "Favorito entre huéspedes",
		category: "centro",
		section: "buenos-aires",
	},
];
```

## División por Secciones

La Home puede renderizar dos secciones filtrando el mismo dataset:

```ts
const buenosAiresListings = filteredListings.filter(
	(listing) => listing.section === "buenos-aires"
);

const madridListings = filteredListings.filter(
	(listing) => listing.section === "madrid"
);
```

## Restricción de ~80 líneas por componente

Para cumplir el límite:

- Extraer tipos y mocks fuera del cuerpo del componente.
- Mantener JSX corto y sin lógica compleja inline.
- Delegar piezas repetidas en `SearchBar`, `ListingCardSkeleton` y `ListingSection`.
- Evitar componentes multipropósito demasiado grandes.

## Orden de Implementación Recomendado

1. Crear tipos y mocks en la Home.
2. Implementar `Navbar` + `SearchBar` con búsqueda controlada.
3. Implementar `FilterCarousel` con categoría activa.
4. Implementar `useEffect` con loading simulado en la página.
5. Implementar `ListingsGrid` con skeleton.
6. Implementar `ListingCard` y conectar secciones.

## Criterios de Aceptación

- El input de la navbar filtra alojamientos en tiempo real usando `searchTerm`.
- La fila de filtros resalta la categoría activa y actualiza el dataset visible.
- La grilla muestra loading durante 1 segundo antes de pintar resultados.
- En móvil hay una sola columna.
- Desde `md` la interfaz se reorganiza para escritorio.
- Todos los componentes son funcionales con `const`.
- Ningún componente supera aproximadamente 80 líneas.

# Especificación Técnica Catálogo Airbnb Clone

## Objetivo

Construir la página de catálogo en la ruta [app/catalog/page.tsx](app/catalog/page.tsx) con enfoque Mobile-First, reutilizando la misma base visual y de datos de la Home. El viewport base es de 375px y la adaptación a escritorio comienza en 768px.

La pantalla se compone de:

1. Navbar reutilizable en la parte superior.
2. Cabecera de resultados con conteo dinámico y control de ordenación por precio.
3. Lista de alojamientos reutilizando exactamente [components/listing-card.tsx](components/listing-card.tsx).
4. Área de mapa estilizada como placeholder.
5. Layout responsive donde el mapa baja debajo de la lista en móvil y pasa a la derecha en escritorio.

## Estructura de Archivos Propuesta

### Páginas en /app

- [app/catalog/page.tsx](app/catalog/page.tsx): compone la pantalla de catálogo y centraliza búsqueda, orden y dataset visible.

### Componentes reutilizables en /components

- [components/navbar.tsx](components/navbar.tsx): se reutiliza sin duplicación.
- [components/search-bar.tsx](components/search-bar.tsx): se reutiliza desde la navbar.
- [components/listing-card.tsx](components/listing-card.tsx): debe reutilizarse exactamente igual.
- [components/listing-card-skeleton.tsx](components/listing-card-skeleton.tsx): opcional para carga si se quisiera homogeneidad con Home.
- [components/catalog-results-header.tsx](components/catalog-results-header.tsx): cabecera con conteo y ordenación.
- [components/catalog-list.tsx](components/catalog-list.tsx): lista/grilla de tarjetas en catálogo.
- [components/map-placeholder.tsx](components/map-placeholder.tsx): bloque visual del mapa.

## Reutilización Obligatoria

- La tarjeta de alojamiento de catálogo no debe recrearse ni derivarse.
- Catálogo debe importar directamente [components/listing-card.tsx](components/listing-card.tsx).
- El contrato `Listing` debe mantenerse compartido desde [components/home-data.ts](components/home-data.ts) o desde un archivo de tipos común futuro.

## Tipos de Dominio para Catálogo

Se recomienda reutilizar `Listing` y agregar el tipo del orden de precio:

```ts
export type PriceSortOrder = "asc" | "desc";

export interface CatalogPageState {
	searchTerm: string;
	sortOrder: PriceSortOrder;
}
```

Si el catálogo usa un subconjunto de datos, puede derivarlo desde `mockListings` sin redefinir la interfaz de alojamiento.

## Jerarquía de Componentes

```text
app/catalog/page.tsx
	CatalogPage
		Navbar
		CatalogResultsHeader
		CatalogContent
			CatalogList
				ListingCard
			MapPlaceholder
```

## Componente: CatalogPage

**Ubicación**

- [app/catalog/page.tsx](app/catalog/page.tsx)

**Responsabilidad**

Orquestar el estado global del catálogo: búsqueda, ordenación por precio y render responsive de lista + mapa.

**Props**

No recibe props. Es una página del App Router.

**Estado local**

```ts
const [searchTerm, setSearchTerm] = useState("");
const [sortOrder, setSortOrder] = useState<PriceSortOrder>("asc");
const [catalogListings] = useState<Listing[]>(mockListings);
```

**Efectos**

- No necesita `useEffect` obligatorio si se trabaja con datos locales ya cargados.
- Si se quisiera sincronizar query params más adelante, ese efecto debe vivir aquí y no en componentes de presentación.

**Datos derivados**

```ts
const visibleListings = [...catalogListings]
	.filter((listing) => {
		const searchable = `${listing.title} ${listing.location}`.toLowerCase();
		return searchable.includes(searchTerm.toLowerCase());
	})
	.sort((a, b) => {
		return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
	});
```

**Conteo dinámico**

```ts
const resultsCount = visibleListings.length;
```

**Layout Tailwind**

- Wrapper principal: `min-h-screen bg-[#fbfbfb] text-zinc-900`
- Contenedor: `mx-auto w-full max-w-7xl px-4 py-4 md:px-8 md:py-6`
- Stack móvil: `flex flex-col gap-6`
- Layout desktop: `md:grid md:grid-cols-[minmax(0,1fr)_380px] md:items-start md:gap-8`

**Notas de implementación**

- Debe comenzar con `"use client"` porque usa `useState`.
- Debe reutilizar [components/navbar.tsx](components/navbar.tsx) para mantener consistencia con Home.
- Debe pasar `searchTerm` y `setSearchTerm` a la navbar para filtrar resultados en tiempo real.

## Componente: CatalogResultsHeader

**Ubicación**

- [components/catalog-results-header.tsx](components/catalog-results-header.tsx)

**Responsabilidad**

Mostrar el número de alojamientos visibles y un control de ordenación por precio ascendente o descendente.

**Props y tipado**

```ts
interface CatalogResultsHeaderProps {
	resultsCount: number;
	sortOrder: PriceSortOrder;
	onSortChange: (order: PriceSortOrder) => void;
}
```

**Estado local**

- No necesita estado propio si `sortOrder` se controla desde la página.

**Efectos**

- No requiere `useEffect`.

**Comportamiento obligatorio**

- El texto de resultados debe cambiar según `resultsCount`.
- El selector debe mutar `sortOrder` y eso debe reordenar `visibleListings` en la UI.

**Ejemplo de etiqueta dinámica**

```ts
const label = `${resultsCount} alojamientos`;
```

**Layout Tailwind**

- Wrapper móvil: `flex flex-col gap-3`
- Desktop: `md:flex-row md:items-center md:justify-between`
- Título: `text-2xl font-semibold tracking-tight`
- Selector: `rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium`

## Componente: CatalogList

**Ubicación**

- [components/catalog-list.tsx](components/catalog-list.tsx)

**Responsabilidad**

Renderizar la colección visible de tarjetas usando exactamente [components/listing-card.tsx](components/listing-card.tsx).

**Props y tipado**

```ts
interface CatalogListProps {
	listings: Listing[];
}
```

**Estado local**

- No necesita estado propio.

**Efectos**

- No requiere `useEffect`.

**Reglas de render**

```ts
if (!listings.length) return <EmptyState />;
return listings.map((listing) => <ListingCard key={listing.id} listing={listing} />);
```

**Layout Tailwind**

- Lista móvil: `grid grid-cols-1 gap-6`
- Desktop: `md:grid-cols-2`
- Ancho de columna fluido: controlado por el contenedor padre del catálogo

**Regla de reutilización**

- No se permite una variante `CatalogListingCard`.
- Si el catálogo necesita metadatos extra, deben resolverse fuera de la tarjeta o ampliando el tipo compartido sin duplicar el componente.

## Componente: MapPlaceholder

**Ubicación**

- [components/map-placeholder.tsx](components/map-placeholder.tsx)

**Responsabilidad**

Representar el área del mapa como un bloque gris estilizado con el texto "Mapa" hasta integrar un mapa real.

**Props y tipado**

```ts
interface MapPlaceholderProps {
	label?: string;
}
```

**Estado local**

- No usa estado.

**Efectos**

- No usa efectos.

**Layout Tailwind**

- Wrapper móvil: `order-last min-h-[280px] rounded-[2rem] bg-zinc-200`
- Desktop: `md:order-none md:sticky md:top-28 md:min-h-[640px]`
- Centrado interno: `flex items-center justify-center`
- Texto: `text-lg font-semibold text-zinc-600`

**Comportamiento responsive obligatorio**

- En móvil debe renderizarse debajo de la lista.
- Desde `md` debe colocarse a la derecha mediante `grid` o `flex` en el layout padre.

## Componente: CatalogContent

**Ubicación**

- Puede resolverse inline dentro de [app/catalog/page.tsx](app/catalog/page.tsx) o extraerse a [components/catalog-content.tsx](components/catalog-content.tsx) si el JSX crece.

**Responsabilidad**

Agrupar visualmente la lista y el mapa dentro del layout responsive principal.

**Props y tipado**

```ts
interface CatalogContentProps {
	listings: Listing[];
}
```

**Estado local**

- No necesita estado propio.

**Efectos**

- No requiere `useEffect`.

**Layout Tailwind**

- Mobile-first: `flex flex-col gap-6`
- Desktop con mapa lateral: `md:grid md:grid-cols-[minmax(0,1fr)_380px] md:gap-8`

## Flujo de Datos Recomendado

1. `CatalogPage` recibe o declara `catalogListings`.
2. `Navbar` actualiza `searchTerm`.
3. `CatalogResultsHeader` actualiza `sortOrder`.
4. `CatalogPage` deriva `visibleListings` aplicando filtro y orden.
5. `CatalogList` renderiza `visibleListings` con [components/listing-card.tsx](components/listing-card.tsx).
6. `MapPlaceholder` se posiciona según viewport sin alterar el flujo de datos.

## Estrategia Mobile-First

### Base móvil 375px

- Navbar en columna.
- Cabecera de resultados apilada.
- Lista en una sola columna.
- Mapa al final del flujo, debajo de las tarjetas.
- Padding lateral: `px-4`.

### Adaptación desde 768px

- Cabecera de resultados pasa a una sola fila.
- El cuerpo usa `grid` o `flex` con lista a la izquierda y mapa a la derecha.
- El mapa puede quedar `sticky` para simular el comportamiento de un catálogo real.
- La lista puede crecer a dos columnas sin romper la reutilización de la tarjeta.

## Restricción de ~80 líneas por componente

Para cumplir el límite:

- Mantener la lógica de ordenación y filtrado en [app/catalog/page.tsx](app/catalog/page.tsx).
- Evitar lógica de negocio dentro de [components/catalog-results-header.tsx](components/catalog-results-header.tsx) y [components/catalog-list.tsx](components/catalog-list.tsx).
- Reutilizar [components/listing-card.tsx](components/listing-card.tsx) tal cual para no duplicar JSX.

## Orden de Implementación Recomendado

1. Crear la ruta [app/catalog/page.tsx](app/catalog/page.tsx).
2. Reutilizar [components/navbar.tsx](components/navbar.tsx) y conectar `searchTerm`.
3. Crear [components/catalog-results-header.tsx](components/catalog-results-header.tsx) con control de orden.
4. Crear [components/catalog-list.tsx](components/catalog-list.tsx) usando [components/listing-card.tsx](components/listing-card.tsx).
5. Crear [components/map-placeholder.tsx](components/map-placeholder.tsx).
6. Montar layout responsive lista + mapa.

## Criterios de Aceptación

- La cabecera muestra el conteo dinámico de resultados visibles.
- El orden ascendente o descendente por precio se controla con `useState` y reordena la UI.
- La tarjeta usada en catálogo es exactamente [components/listing-card.tsx](components/listing-card.tsx).
- En móvil el mapa aparece debajo de la lista.
- Desde `md` el mapa pasa a la derecha del listado.
- El mapa por defecto es un recuadro gris con la palabra "Mapa".
- Todos los componentes son funcionales con `const`.
- Ningún componente supera aproximadamente 80 líneas.

# Especificación Técnica Detalle de Habitación Airbnb Clone

## Objetivo

Construir la vista de detalle de habitación en la ruta [app/rooms/[id]/page.tsx](app/rooms/[id]/page.tsx) con enfoque Mobile-First (375px) y adaptación a escritorio desde 768px.

La pantalla debe incluir:

1. Navegación de retorno a catálogo con `<Link>`.
2. Carga dinámica de datos según el `id` de la URL.
3. Galería de fotos con carrusel e índice activo.
4. Secciones internas de información (cabecera, anfitrión, servicios).
5. Tarjeta de reserva con contador interactivo de huéspedes.

## Estructura de Archivos Propuesta

### Páginas en /app

- [app/rooms/[id]/page.tsx](app/rooms/[id]/page.tsx): orquesta estado de carga, selección de habitación y estructura general.

### Componentes reutilizables en /components

- [components/navbar.tsx](components/navbar.tsx): cabecera superior global reutilizable.
- [components/room-photo-carousel.tsx](components/room-photo-carousel.tsx): carrusel con navegación anterior/siguiente.
- [components/room-header.tsx](components/room-header.tsx): título, valoración y ubicación.
- [components/host-row.tsx](components/host-row.tsx): fila del anfitrión con avatar y metadatos.
- [components/services-grid.tsx](components/services-grid.tsx): servicios en grid icono + etiqueta.
- [components/reservation-card.tsx](components/reservation-card.tsx): precio + contador de huéspedes + CTA.
- [components/room-detail-skeleton.tsx](components/room-detail-skeleton.tsx): estado de carga visual.

## Tipos de Dominio

Se recomienda extender los tipos existentes con un contrato específico para detalle.

```ts
export interface HostInfo {
	name: string;
	yearsHosting: number;
	avatar: string;
}

export interface ServiceItem {
	id: string;
	label: string;
	icon: string;
}

export interface RoomDetail {
	id: string;
	title: string;
	location: string;
	rating: number;
	reviewsCount: number;
	pricePerNight: number;
	currency: string;
	maxGuests: number;
	photos: string[];
	host: HostInfo;
	services: ServiceItem[];
	bedrooms: number;
	beds: number;
	bathrooms: number;
}
```

## Jerarquía de Componentes

```text
app/rooms/[id]/page.tsx
	RoomDetailPage
		Navbar
		Link (volver a /catalog)
		RoomHeader
		RoomPhotoCarousel
		MainContent
			InfoColumn
				HostRow
				ServicesGrid
			ReservationCard
```

## Componente: RoomDetailPage

**Ubicación**

- [app/rooms/[id]/page.tsx](app/rooms/[id]/page.tsx)

**Responsabilidad**

Capturar `id` dinámico de la URL, simular carga, resolver el detalle de habitación y componer la pantalla.

**Props**

No recibe props directas (Client Component). Consume App Router con hooks.

**Estado local**

```ts
const [loading, setLoading] = useState(true);
const [room, setRoom] = useState<RoomDetail | null>(null);
const [searchTerm, setSearchTerm] = useState("");
```

**Captura del id dinámico (App Router)**

```ts
const params = useParams<{ id: string }>();
const roomId = params.id;
```

**Carga de datos obligatoria con useEffect + setTimeout**

```ts
useEffect(() => {
	setLoading(true);

	const timer = setTimeout(() => {
		const foundRoom = mockRooms.find((item) => item.id === roomId) ?? null;
		setRoom(foundRoom);
		setLoading(false);
	}, 1000);

	return () => clearTimeout(timer);
}, [roomId]);
```

**Reglas de render**

```ts
if (loading) return <RoomDetailSkeleton />;
if (!room) return <NotFoundState />;
return <DetailLayout room={room} />;
```

**Layout Tailwind**

- Wrapper principal: `min-h-screen bg-[#fbfbfb] text-zinc-900`
- Contenedor: `mx-auto w-full max-w-7xl px-4 py-4 md:px-8 md:py-6`
- Estructura móvil: `flex flex-col gap-6`
- Estructura escritorio para columnas: `md:grid md:grid-cols-[minmax(0,1fr)_360px] md:items-start md:gap-8`

**Notas de implementación**

- Debe iniciar con `"use client"` por uso de `useState`, `useEffect` y `useParams`.
- El botón/breadcrumb de retorno debe usar obligatoriamente `<Link href="/catalog">`.

## Componente: RoomPhotoCarousel

**Ubicación**

- [components/room-photo-carousel.tsx](components/room-photo-carousel.tsx)

**Responsabilidad**

Mostrar fotos de la habitación con navegación anterior/siguiente y control del índice activo.

**Props y tipado**

```ts
interface RoomPhotoCarouselProps {
	photos: string[];
	title: string;
}
```

**Estado local obligatorio**

```ts
const [activePhotoIndex, setActivePhotoIndex] = useState(0);
```

**Efectos**

- No requiere `useEffect` para navegación básica.

**Navegación obligatoria por botones**

```ts
const goNext = () => {
	setActivePhotoIndex((current) => (current + 1) % photos.length);
};

const goPrev = () => {
	setActivePhotoIndex((current) =>
		(current - 1 + photos.length) % photos.length
	);
};
```

**Layout Tailwind**

- Wrapper: `relative overflow-hidden rounded-[2rem] bg-zinc-100`
- Imagen: `aspect-[4/3] w-full object-cover md:aspect-[16/9]`
- Controles: `absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3`
- Indicador: `absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs text-white`

## Componente: RoomHeader

**Ubicación**

- [components/room-header.tsx](components/room-header.tsx)

**Responsabilidad**

Renderizar título principal, rating, cantidad de reseñas y ubicación.

**Props y tipado**

```ts
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
```

**Estado local**

- No necesita estado propio.

**Efectos**

- No usa `useEffect`.

**Layout Tailwind**

- Wrapper: `space-y-2`
- Título: `text-3xl font-semibold tracking-tight`
- Metadata: `text-sm text-zinc-600`
- Fila rating/location: `flex flex-wrap items-center gap-2 text-sm font-medium`

## Componente: HostRow

**Ubicación**

- [components/host-row.tsx](components/host-row.tsx)

**Responsabilidad**

Mostrar información del anfitrión: avatar, nombre y años hospedando.

**Props y tipado**

```ts
interface HostRowProps {
	host: HostInfo;
}
```

**Estado local**

- No usa estado.

**Efectos**

- No usa `useEffect`.

**Layout Tailwind**

- Wrapper: `flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4`
- Avatar: `h-14 w-14 rounded-full object-cover`
- Texto secundario: `text-sm text-zinc-500`

## Componente: ServicesGrid

**Ubicación**

- [components/services-grid.tsx](components/services-grid.tsx)

**Responsabilidad**

Mostrar la lista de servicios en formato grid de icono + etiqueta.

**Props y tipado**

```ts
interface ServicesGridProps {
	services: ServiceItem[];
}
```

**Estado local**

- No necesita estado.

**Efectos**

- No requiere `useEffect`.

**Layout Tailwind**

- Wrapper: `grid grid-cols-1 gap-3 sm:grid-cols-2`
- Item: `flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3`
- Icono: `text-zinc-700`

## Componente: ReservationCard

**Ubicación**

- [components/reservation-card.tsx](components/reservation-card.tsx)

**Responsabilidad**

Mostrar precio por noche, contador interactivo de huéspedes con rango válido y botón de reserva.

**Props y tipado**

```ts
interface ReservationCardProps {
	pricePerNight: number;
	currency: string;
	maxGuests: number;
}
```

**Estado local obligatorio**

```ts
const [guests, setGuests] = useState(1);
```

**Reglas de rango mínimo/máximo**

```ts
const decreaseGuests = () => setGuests((value) => Math.max(1, value - 1));
const increaseGuests = () => setGuests((value) => Math.min(maxGuests, value + 1));
```

**Efectos**

- No requiere `useEffect` para el contador.

**CTA**

- Botón principal con texto tipo "Reservar" o "Reservar ahora".
- Puede incluir callback opcional `onReserve` en una versión posterior.

**Layout Tailwind**

- Wrapper: `rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-sm`
- Precio: `text-3xl font-semibold tracking-tight`
- Control huéspedes: `flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2`
- Botones +/-: `h-9 w-9 rounded-full border border-zinc-300 disabled:opacity-40`
- CTA: `mt-4 w-full rounded-xl bg-zinc-900 px-4 py-3 text-white`
- Posición escritorio: `md:sticky md:top-28`

## Componente: BackToCatalog

**Ubicación**

- Puede ser inline en [app/rooms/[id]/page.tsx](app/rooms/[id]/page.tsx) o extraerse a [components/back-to-catalog.tsx](components/back-to-catalog.tsx).

**Responsabilidad**

Permitir volver a catálogo usando obligatoriamente `<Link>` de Next.js.

**Props y tipado**

```ts
interface BackToCatalogProps {
	label?: string;
}
```

**Implementación obligatoria**

```tsx
<Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-medium">
	<span aria-hidden="true">←</span>
	Volver a catalogo
</Link>
```

No se debe usar `window.history.back()` como mecanismo principal.

## Estado de Carga y Vacío

### RoomDetailSkeleton

- Usar placeholders `animate-pulse` para cabecera, imagen y tarjeta de reserva.
- Mantener layout final para evitar saltos visuales.

### NotFoundState

- Si no existe `room` para el `id`, mostrar mensaje y enlace a [app/catalog/page.tsx](app/catalog/page.tsx).

## Flujo de Datos Recomendado

1. `RoomDetailPage` lee `id` con `useParams`.
2. `useEffect` simula fetch con `setTimeout(1000)`.
3. Al terminar carga, setea `room` y `loading`.
4. `RoomPhotoCarousel` maneja índice activo de imagen.
5. `ReservationCard` maneja contador de huéspedes dentro del rango válido.
6. `<Link href="/catalog">` resuelve la navegación de retorno.

## Estrategia Mobile-First

### Base móvil 375px

- Stack vertical único: retorno, cabecera, galería, anfitrión, servicios, tarjeta de reserva.
- Carrusel ocupa ancho completo.
- Tarjeta de reserva se ubica al final del flujo.

### Adaptación desde 768px

- Estructura en dos columnas para información y reserva.
- Tarjeta de reserva pasa a lateral derecho con `sticky`.
- Galería mantiene prioridad visual en la parte superior.

## Restricción de ~80 líneas por componente

Para cumplir el límite:

- Dejar el `useEffect` de carga únicamente en [app/rooms/[id]/page.tsx](app/rooms/[id]/page.tsx).
- Mantener [components/room-photo-carousel.tsx](components/room-photo-carousel.tsx) enfocado solo en navegación de fotos.
- Mantener [components/reservation-card.tsx](components/reservation-card.tsx) enfocado solo en precio + huéspedes + CTA.
- Evitar lógica de negocio en [components/room-header.tsx](components/room-header.tsx), [components/host-row.tsx](components/host-row.tsx) y [components/services-grid.tsx](components/services-grid.tsx).

## Orden de Implementación Recomendado

1. Crear ruta [app/rooms/[id]/page.tsx](app/rooms/[id]/page.tsx) como Client Component.
2. Implementar `useParams` + `useEffect` + `setTimeout` para carga.
3. Agregar botón de retorno con `<Link href="/catalog">`.
4. Implementar [components/room-photo-carousel.tsx](components/room-photo-carousel.tsx) con índice activo.
5. Implementar secciones [components/room-header.tsx](components/room-header.tsx), [components/host-row.tsx](components/host-row.tsx), [components/services-grid.tsx](components/services-grid.tsx).
6. Implementar [components/reservation-card.tsx](components/reservation-card.tsx) con contador de huéspedes.
7. Añadir skeleton y estado no encontrado.

## Criterios de Aceptación

- Se captura dinámicamente `id` de la URL con App Router.
- La carga de detalle usa `useEffect` + `setTimeout` y muestra estado de carga.
- El carrusel gestiona `activePhotoIndex` con `useState` y botones Anterior/Siguiente.
- La vista incluye cabecera, fila del anfitrión y servicios en grid.
- La tarjeta de reserva incluye precio por noche, contador de huéspedes con rango válido y CTA.
- Existe navegación de retorno a catálogo usando obligatoriamente `<Link href="/catalog">`.
- El diseño es Mobile-First y se adapta correctamente desde `md`.
- Todos los componentes son funcionales con `const`.
- Ningún componente supera aproximadamente 80 líneas.
