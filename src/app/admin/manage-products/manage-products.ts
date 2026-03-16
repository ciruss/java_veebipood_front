import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { environment } from '../../../environments/environments';

import { Product } from '../../models/product';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-manage-products',
  imports: [],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.css',
})
export class ManageProducts {
  products: Product[] = [];

  private detectChange = inject(ChangeDetectorRef);

  ngOnInit() {
    fetch(`${backendUrl}/products`)
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        this.detectChange.detectChanges();
      });
  }

  deleteProduct(productId: number) {
    console.log(`Deleting product with ID: ${productId}`);
  }

  editProduct(productId: number) {
    console.log(`Editing product with ID: ${productId}`);
  }
}
