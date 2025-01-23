export interface RoomForm {
  idHotel: number;
  code: string;
  persons: number;
  available: boolean;
  active: boolean;
  tax: number;
  cost: number;
  type: string;
}

export interface RoomData extends RoomForm {
  id: number;
}

export interface RoomDataSeleted extends RoomData {
  select: boolean;
}
