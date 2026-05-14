export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySlots {
  label: string;       // "Today", "Tomorrow", "Wed May 16"
  date: string;        // ISO date string
  slots: TimeSlot[];
}

export interface Provider {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  subspecialty?: string;
  rating: number;
  reviewCount: number;
  city: string;
  distance: string;
  address: string;
  phone: string;
  photo: string;
  nextAvailable: string;
  availability: DaySlots[];
  about: string;
  specialties: string[];
  insurances: string[];
  languages: string[];
  lat: number;
  lng: number;
  reviews: Review[];
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  timeAgo: string;
}
