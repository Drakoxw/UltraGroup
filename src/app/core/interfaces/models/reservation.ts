export interface Reservation {
  id: number;
  hotelId: number;
  roomId: number;
  roomCode: string;
  checkInDate: string;
  checkOutDate: string;
  guests: Guest[];
  emergencyContact: EmergencyContact;
  totalCost: number;
}

export interface Guest {
  fullName: string;
  birthDate: string;
  gender: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
}

export interface EmergencyContact {
  fullName: string;
  phone: string;
}
