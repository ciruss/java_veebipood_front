import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { environment } from '../../../environments/environments';
import { Product } from '../../models/product';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-manage-products',
  imports: [RouterLink],
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
    fetch(`${backendUrl}/products/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        this.detectChange.detectChanges();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  }
}
