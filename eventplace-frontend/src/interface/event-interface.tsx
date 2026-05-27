export const AgeRating = {
  EVERYONE: 'EVERYONE',
  ADULT: 'ADULT',
} as const;

export type AgeRating = typeof AgeRating[keyof typeof AgeRating];

export interface Localization {
  id: string;
  eventId: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  number: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketType {
  id: string;
  name: string;
  quantity: number;
  price: string;
  createdAt: string;
  eventId: string;
}

export interface EventDTO {
  id: string;
  title: string;
  description: string;
  banner?: string;
  date: string;
  appropriate_age: AgeRating;
  max_person_quantity: number;
  endAt: string;
  createdAt: string;
  updatedAt: string;
  cep: string;
  userId: string;
  localization: Localization[];
  ticketType: TicketType[];
  user: {
    name: string;
  }
}