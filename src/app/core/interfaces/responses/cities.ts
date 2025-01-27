export interface CityData {
  id: number;
  nombre: string;
  codigoDANE: string;
}

export interface CitiesResponse {
  status: 'ok' | 'error';
  message: string;
  ciudades: CityData[];
}
