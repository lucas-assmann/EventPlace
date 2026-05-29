
export interface TicketTypeDTO {
  id: string;
  userId: string;
  createdAt: string;
  ticketTypeId: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  paymentCode: string | null;
  ticketType: {
    id: string;
    name: string;
    quantity: number;
    price: string;
    createdAt: string;
    eventId: string;
    event: {
      id: string;
      title: string;
      date: string;
    };
  };
}

export interface TicketDTO {
  id: string;
  userId: string;
  createdAt: string;
  ticketTypeId: string;
}