import { Address } from './address';

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personCode: string;
  address: Address;
};
