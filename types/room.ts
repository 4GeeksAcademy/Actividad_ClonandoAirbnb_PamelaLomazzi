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
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  pricePerNight: number;
  currency: string;
  maxGuests: number;
  photos: string[];
  host: HostInfo;
  services: ServiceItem[];
}
