import { UserData } from './models';

export interface TokenData extends Omit<UserData, 'password'> {
  exp: number;
}
