export const PATH = {
  HOME: 'home',
  ROUTE_1: 'hotels',
  ROUTE_2: 'booking',
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
    path: `/${PATH.ROUTE_1}`,
    private: true,
  },
  {
    label: 'Reservas',
    path: `/${PATH.ROUTE_2}`,
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
