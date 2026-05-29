import type { Localization } from "./event-interface";

export interface UserDTO {
  id: string;
  name: string;
  rating: number;
  username: string;
  birthDate: Date;
  cep: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  localization: Localization[];
}