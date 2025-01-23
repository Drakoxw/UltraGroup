export const TOKEN_KEY = 'token_access'

export type RolTypes = 1 | 2 | 3 | 4;
export type Permisions = 'ADMIN' | 'USER'

export const ROL_TYPES: { [key in Permisions]: RolTypes } = {
  ADMIN: 1,
  USER: 2,
}

export const TYPES_ROOM: {label: string, value: string}[] = [
  {
    label: "SUPER LUJO",
    value: "SUPER LUJO"
  },
  {
    label: "LUJO",
    value: "LUJO"
  },
  {
    label: "CLASICA",
    value: "CLASICA"
  },
  {
    label: "SENCILLA",
    value: "SENCILLA"
  }
]
