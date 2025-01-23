export const PATH = {
  HOME: 'home',
  HOTELS: 'hotels',
  BOOKING: 'booking',
  ROOMS: 'hotel-rooms',
  AUTH: 'auth',
  LOGOUT: 'logout',
};

export const ROUTES = [
  {
    label: 'Inicio',
    path: `/${PATH.HOME}`,
    private: false,
  },
  {
    label: 'Hoteles',
    path: `/${PATH.HOTELS}`,
    private: true,
  },
  {
    label: 'Habitaciones',
    path: `/${PATH.ROOMS}`,
    private: true,
  },
  {
    label: 'Reservas',
    path: `/${PATH.BOOKING}`,
    private: true,
  },
  {
    label: 'Salir',
    path: `/${PATH.LOGOUT}`,
    private: true,
  },
  {
    label: 'Login',
    path: `/${PATH.LOGOUT}`,
    private: false,
  },
];

export const PRIVATES_ROUTES = ROUTES.filter(
  (route) => route.private || route.path === `/${PATH.HOME}`
);

export const PUBLIC_ROUTES = ROUTES.filter((route) => !route.private);
