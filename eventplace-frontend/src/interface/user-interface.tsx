import type { EventDTO, Localization } from "./event-interface";
import type { TicketDTO } from "./ticket-interface";

export interface UserDTO {
  id: string;
  name: string;
  rating: number;
  avatar?: string;
  username: string;
  birthDate: Date;
  cep: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  userAge: 'ADULT' | 'MINOR';

  localization: Localization[];
  tickets: TicketDTO[];
  events: EventDTO[];
}