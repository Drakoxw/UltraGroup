import { UserData } from "@interfaces/models";

export interface UserResponse extends Omit<UserData, 'password'> {}
