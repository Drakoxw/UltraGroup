import { HotelData } from "@interfaces/models/hotel";

export const HOTELS_DATA: HotelData[] = [
  {
    id: 1,
    name: 'Grand Luxury Hotel',
    location: 'New York, USA',
    stars: 5,
    numberOfRooms: 200,
    description: 'A luxurious hotel in the heart of New York City.',
    phone: '3001234567',
    active: true
  },
  {
    id: 2,
    name: 'Beachside Resort',
    location: 'Miami, USA',
    stars: 4,
    numberOfRooms: 150,
    description: 'A beautiful beachfront resort with stunning ocean views.',
    phone: '3011234567',
    active: false
  },
  {
    id: 3,
    name: 'Mountain Escape Lodge',
    location: 'Aspen, USA',
    stars: 5,
    numberOfRooms: 100,
    description: 'A cozy lodge located in the picturesque mountains of Aspen.',
    phone: '3021234567',
    active: true
  },
  {
    id: 4,
    name: 'City Center Hotel',
    location: 'Chicago, USA',
    stars: 3,
    numberOfRooms: 250,
    description: 'A convenient hotel located in downtown Chicago.',
    phone: '3031234567',
    active: true
  },
  {
    id: 5,
    name: 'Desert Oasis Resort',
    location: 'Phoenix, USA',
    stars: 4,
    numberOfRooms: 180,
    description: 'A serene oasis in the desert offering luxury and relaxation.',
    phone: '3041234567',
    active: true
  },
];
