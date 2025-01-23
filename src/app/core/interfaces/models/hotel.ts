export interface HotelForm {
  name: string;
  location: string;
  stars: number;
  numberOfRooms: number;
  description: string;
  phone: string;
  active: boolean;
}

export interface HotelData extends HotelForm {
  id: number;
}
