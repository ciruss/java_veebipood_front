import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { environment } from '../../../environments/environments';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';

const backendUrl = environment.backendUrl;

@Component({
  selector: 'app-manage-products',
  imports: [RouterLink, FormsModule],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.css',
})
export class ManageProducts {
  products: Product[] = [];
  searchTerm: string = '';

  private detectChange = inject(ChangeDetectorRef);

  private fetchProducts() {
    fetch(`${backendUrl}/products/admin?searchTerm=${this.searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        this.detectChange.detectChanges();
      });
  }

  ngOnInit() {
    this.fetchProducts();
  }

  search() {
    this.fetchProducts();
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
