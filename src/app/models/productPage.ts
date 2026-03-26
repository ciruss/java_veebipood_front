import { Product } from './product';

export type ProductsPage = {
  content: Product[];
  totalPages: number;
  totalElements: number;
  size: number;
};
