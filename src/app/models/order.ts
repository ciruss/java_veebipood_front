import { OrderRow } from './orderRow';
import { Person } from './person';

export type Order = {
  id: number;
  total: number;
  created: string;
  orderRows: OrderRow[];
  person: Person;
};
