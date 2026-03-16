import { Product } from './product';

export type OrderRow = {
  id?: number;
  product: Product;
  quantity: number;
};
