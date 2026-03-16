import { Routes } from '@angular/router';

import { Homepage } from './homepage/homepage';
import { Cart } from './cart/cart';
import { AddProduct } from './admin/add-product/add-product';
import { EditProduct } from './admin/edit-product/edit-product';
import { ManageCategories } from './admin/manage-categories/manage-categories';
import { ManageProducts } from './admin/manage-products/manage-products';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'cart', component: Cart },
  { path: 'admin/add-product', component: AddProduct },
  { path: 'admin/edit-product', component: EditProduct },
  { path: 'admin/manage-products', component: ManageProducts },
  { path: 'admin/manage-categories', component: ManageCategories },
  { path: '**', component: NotFound },
];
