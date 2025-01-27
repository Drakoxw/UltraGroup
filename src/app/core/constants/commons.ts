import { DestinationAndCheck, SelectOptions } from '@interfaces/index';

export const TOKEN_KEY = 'token_access';

export type RolTypes = 1 | 2 | 3 | 4;
export type Permisions = 'ADMIN' | 'USER';

export const ROL_TYPES: { [key in Permisions]: RolTypes } = {
  ADMIN: 1,
  USER: 2,
};

export const STEPS_OPTIONS = [
  {
    label: 'Habitación'
  },
  {
    label: 'Personas'
  },
  {
    label: 'Contacto'
  },
  {
    label: 'Pagos'
  }
];

export const GENDER_OPTIONS: SelectOptions[] = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Masculino',
    value: 'Male',
  },
  {
    label: 'Femenino',
    value: 'Female',
  },
  {
    label: 'Otro',
    value: 'Other',
  }
]

export const DOCUMENTS_OPTIONS: SelectOptions[] = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Cedula',
    value: 'CC',
  },
  {
    label: 'Nit',
    value: 'NIT',
  },
  {
    label: 'Pasaporte',
    value: 'PP',
  },
  {
    label: 'Tarjeta de Identidad',
    value: 'TI',
  }
]

export const TYPES_ROOM: SelectOptions[] = [
  {
    label: 'SUPER LUJO',
    value: 'SUPER LUJO',
  },
  {
    label: 'LUJO',
    value: 'LUJO',
  },
  {
    label: 'CLASICA',
    value: 'CLASICA',
  },
  {
    label: 'SENCILLA',
    value: 'SENCILLA',
  },
];

export const PEOPLE_PER_ROOM: SelectOptions[] = [
  {
    label: '1 Persona',
    value: '1',
  },
  {
    label: '2 Personas',
    value: '2',
  },
  {
    label: '3 Personas',
    value: '3',
  },
  {
    label: '4 Personas',
    value: '4',
  },
  {
    label: '5 Personas',
    value: '5',
  },
  {
    label: '6 Personas',
    value: '6',
  },
  {
    label: '7 Personas',
    value: '7',
  },
  {
    label: '8 Personas',
    value: '8',
  },
  {
    label: '9 Personas',
    value: '9',
  },
  {
    label: '10 Personas',
    value: '10',
  },
];

export const DESTINATION_MOCK: DestinationAndCheck = {
  destination: '',
  people: 0,
  dateFrom: '',
  dateTo: ''
}
